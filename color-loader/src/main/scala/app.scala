/* SimpleApp.scala */
import org.apache.spark.sql.functions._
import org.apache.spark.sql.SparkSession
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
      .option("checkpointLocation", "/tmp/whatevs/readCheckpoint")
      .load()

    val query = df.selectExpr("CAST(key as STRING)", "CAST(value as STRING)", "CAST(timestamp as TIMESTAMP)")
      .withWatermark("timestamp", "6 seconds")
      .groupBy(
        window(col("timestamp"), "6 seconds", "3 seconds"),
        col("key").alias("key")
      )
      .agg(
        count("value").cast("STRING").alias("value")
      )
      .writeStream
      .outputMode("update")
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("topic", "colors.processed")
      .option("checkpointLocation", "/tmp/whatevs/writeCheckpoint")
      .start()

    query.awaitTermination()

    spark.stop()
  }
}