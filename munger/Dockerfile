FROM benwright/sbt as builder

WORKDIR /var/app
COPY ./ ./
RUN sbt package

FROM benwright/spark

COPY --from=builder /var/app/target/scala-2.11/simple-project_2.11-1.0.jar code.jar

CMD [ \
    "spark-submit", \
    "--class", "SimpleApp", \
    "code.jar" \
]

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