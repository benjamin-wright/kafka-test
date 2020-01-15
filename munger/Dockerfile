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