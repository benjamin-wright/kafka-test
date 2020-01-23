/* SimpleApp.scala */
import org.apache.spark.sql.functions._
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.types._
import org.apache.log4j.Logger
import org.apache.log4j.Level

object ColorLoader {
  def main(args: Array[String]) {
    Logger.getLogger("org").setLevel(Level.OFF)
    Logger.getLogger("akka").setLevel(Level.OFF)

    val spark = SparkSession.builder.appName("Color Loader").getOrCreate()
    import spark.implicits._

    val stage1 = spark
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("subscribePattern", "colors.raw")
      .option("startingOffsets", "earliest")
      .option("checkpointLocation", "/tmp/whatevs/readCheckpoint")
      .load()

    val query1 = stage1.select(
        lit("0").alias("lit"),
        col("key").cast("STRING"),
        col("timestamp").cast("TIMESTAMP")
      )
      .withWatermark("timestamp", "5 seconds")
      .groupBy(
        col("key").alias("color")
      )
      .agg(
        lit("data").alias("key"),
        count("timestamp").cast("STRING").alias("count_messages")
      )
      .groupBy(
        col("key")
      )
      .agg(
        collect_list("color").alias("colors"),
        collect_list("count_messages").alias("counts")
      ).select(
        col("key"),
        map_from_arrays(
            col("colors"),
            col("counts")
        ).alias("value")
      )
      .writeStream
      .outputMode("update")
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("topic", "colors.processed")
      .option("checkpointLocation", "/tmp/whatevs/aggregationCheckpoint")
      .start()

    val stage2 = spark
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("subscribePattern", "colors.raw")
      .option("startingOffsets", "earliest")
      .option("checkpointLocation", "/tmp/whatevs/readCheckpoint")
      .load()

    val query2 = stage2.select(
        lit("0").alias("lit"),
        col("key").cast("STRING"),
        col("timestamp").cast("TIMESTAMP")
      )
      .withWatermark("timestamp", "5 seconds")
      .groupBy(
        col("key").alias("color")
      )
      .agg(
        lit("data").alias("key"),
        count("timestamp").cast("STRING").alias("count_messages")
      )
      .groupBy(
        col("key")
      )
      .agg(
        collect_list("color").alias("colors"),
        collect_list("count_messages").alias("counts")
      ).select(
        col("key"),
        map_from_arrays(
            col("colors"),
            col("counts")
        ).alias("value")
      )
      .writeStream
      .outputMode("update")
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("topic", "colors.processed")
      .option("checkpointLocation", "/tmp/whatevs/aggregationCheckpoint")
      .start()
      .awaitTermination()

    spark.stop()
  }
}