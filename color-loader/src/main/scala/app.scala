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
      .option("checkpointLocation", "/tmp/whatevs/readCheckpoint")
      .load()

    val schema = new StructType()
      .add("color", StringType)
      .add("index", IntegerType)

    val query = df.select(
        col("key").cast("STRING"),
        from_json(col("value").cast("STRING"), schema).alias("data"),
        col("timestamp").cast("TIMESTAMP")
      )
      .withWatermark("timestamp", "5 seconds")
      .groupBy(
        col("data.color").alias("key")
      )
      .agg(
        count("data.index").cast("STRING").alias("value")
      )
      .writeStream
      .outputMode("update")
      .format("kafka")
      .option("kafka.bootstrap.servers", "kafka:9092")
      .option("topic", "colors.processed")
      .option("checkpointLocation", "/tmp/whatevs/aggregationCheckpoint")
      .start()

    query.awaitTermination()

    spark.stop()
  }
}