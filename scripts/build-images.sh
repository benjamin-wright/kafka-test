#!/bin/bash

docker build -t benwright/sbt images/sbt &
docker build -t benwright/spark images/spark &

wait

echo "done"