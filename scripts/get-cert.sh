#!/bin/bash

kubectl get secret -n infra -o "jsonpath='{.items[*].metadata.name}'"