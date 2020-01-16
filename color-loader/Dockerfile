FROM benwright/sbt as builder

WORKDIR /var/app
COPY ./ ./
RUN sbt package

FROM benwright/spark

COPY --from=builder /var/app/target/scala-2.11/color-loader_2.11-1.0.jar code.jar

CMD [ \
    "spark-submit", \
    "--packages", "org.apache.spark:spark-sql-kafka-0-10_2.11:2.4.4", \
    "--class", "ColorLoader", \
    "code.jar" \
]