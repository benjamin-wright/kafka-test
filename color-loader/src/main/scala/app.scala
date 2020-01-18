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

    val df = spark
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("subscribePattern", "colors.raw")
      .option("startingOffsets", "earliest")
      .option("checkpointLocation", "/tmp/whatevs/readCheckpoint")
      .load()

    val query1 = df.select(
        lit("0").alias("lit"),
        col("key").cast("STRING"),
        col("timestamp").cast("TIMESTAMP")
      )
      .withWatermark("timestamp", "5 seconds").groupBy(
        col("key").alias("key")
      )
      .agg(
        count("timestamp").cast("STRING").alias("value")
      )
      .writeStream
      .outputMode("update")
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("topic", "colors.processed")
      .option("checkpointLocation", "/tmp/whatevs/aggregationCheckpoint")
      .start()

    val query2 = df.select(
        lit("0").alias("lit"),
        col("key").cast("STRING"),
        col("timestamp").cast("TIMESTAMP")
      )
      .withWatermark("timestamp", "5 seconds").groupBy(
        col("lit")
      )
      .agg(
        collect_set("key").alias("keys")
      )
      .select(
        lit("color_list").alias("key"),
        to_json(col("keys")).alias("value")
      )
      .writeStream
      .outputMode("update")
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("topic", "colors.list")
      .option("checkpointLocation", "/tmp/whatevs/listCheckpoint")
      .start()

    query1.awaitTermination()
    query2.awaitTermination()

    spark.stop()
  }
}