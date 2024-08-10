#!/bin/bash

mkdir -p ./build

cp -R ./static/* ./build/

npx rollup -c

