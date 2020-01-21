#!/bin/bash

if ! (kind get clusters | grep -q kafka-test); then
  kind create cluster --config ./infrastructure/kind-config.yaml --name kafka-test
fi

devspace use namespace color-monitor

kubectl create namespace infra
helm dependencies update ./infrastructure/helm
helm install infra --namespace infra ./infrastructure/helm

echo "Your development cluster is ready to use! You may want to run 'sudo devspace run hosts' to update your /etc/hosts file"