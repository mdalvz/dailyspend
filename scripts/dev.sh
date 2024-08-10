#!/bin/bash

echo "Building..."

bash ./scripts/build.sh

echo "Watching..."

npx concurrently "bash ./scripts/watch.sh" "bash ./scripts/serve.sh"

