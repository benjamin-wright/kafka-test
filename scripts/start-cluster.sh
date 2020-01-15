#!/bin/bash

if ! (kind get clusters | grep -q kafka-test); then
  kind create cluster --name kafka-test
fi

devspace use namespace color-monitor