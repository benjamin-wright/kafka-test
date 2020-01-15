FROM openjdk:8-slim

COPY sbt-1.3.4.tgz ./sbt.tgz
RUN tar -xvf sbt.tgz \
    && rm sbt.tgz \
    && ./sbt/bin/sbt help
ENV PATH=$PATH:/sbt/bin

# FROM openjdk:8-slim

# RUN apt-get update \
#     && apt-get install -y curl \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/* \
#     && curl https://archive.apache.org/dist/spark/spark-2.4.4/spark-2.4.4-bin-hadoop2.7.tgz --output spark.tgz \
#     && tar -xvf spark.tgz \
#     && rm spark.tgz

# ENV SPARK_HOME=/spark-2.4.4-bin-hadoop2.7
# ENV PATH="$SPARK_HOME/bin:$PATH"