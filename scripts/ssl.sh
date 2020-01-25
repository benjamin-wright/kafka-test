#!/bin/bash

cd ssl

./clear-certs.sh
./make-root.sh
./make-certs.sh

cd -

mv ./ssl/certs/ponglehub* infrastructure/helm/

echo "Certificates created, please add 'ssl/rootCA.pem' to your trusted keys"