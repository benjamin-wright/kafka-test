/* SimpleApp.scala */
import org.apache.spark.sql.SparkSession

object SimpleApp {
  def main(args: Array[String]) {
    val spark = SparkSession.builder.appName("Simple Application").getOrCreate()
    
    val spark
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "redis:6379")
      .option("subscribePattern", "colours.raw")
      .load()

    val query = df.selectExpr("CAST(key as STRING)", "CAST(value as STRING)")
      .writeStream()
      .format("kafka")
      .option("kafka.bootstrap.servers", "host1:port1,host2:port2")
      .option("topic", "topic1")
      .start()

    query.awaitTermination()
    
    spark.stop()
  }
}