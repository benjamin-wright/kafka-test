FROM openjdk:8-slim

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && curl https://sbt-downloads.cdnedge.bluemix.net/releases/v1.3.6/sbt-1.3.6.tgz --output sbt.tgz \
    && tar -xvf sbt.tgz \
    && rm sbt.tgz \
    && ./sbt/bin/sbt help

WORKDIR /var/app

ENV PATH=$PATH:/sbt/bin