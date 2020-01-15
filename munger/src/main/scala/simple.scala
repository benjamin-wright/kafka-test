/* SimpleApp.scala */
import org.apache.spark.sql.SparkSession

object SimpleApp {
  def main(args: Array[String]) {
    val logFile = "/spark-2.4.4-bin-hadoop2.7/README.md" // Should be some file on your system
    val spark = SparkSession.builder.appName("Simple Application").getOrCreate()
    val logData = spark.read.textFile(logFile).cache()
    val numAs = logData.filter(line => line.contains("a")).count()
    val numBs = logData.filter(line => line.contains("b")).count()
    val numFs = logData.filter(line => line.contains("f")).count()
    println(s"Lines with a: $numAs, Lines with b: $numBs, Lines with f: $numFs")
    spark.stop()
  }
}