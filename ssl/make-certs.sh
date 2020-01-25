#!/bin/bash

function make-certs() {
  name=$1
  file=$2

  openssl req -new -nodes -out certs/$name.csr -newkey rsa:2048 -keyout certs/$name.key -config $file
  openssl x509 -req -in certs/$name.csr -CA certs/rootCA.pem -CAkey certs/rootCA.key -CAcreateserial -out certs/$name.crt -days 500 -sha256 -extfile configs/v3.ext
  rm certs/$name.csr
}

make-certs ponglehub configs/ponglehub.conf