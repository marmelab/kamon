#!/bin/bash

yarn workspace @kamon/core build -w &

yarn workspace @kamon/webapp db:migrate 

yarn workspace @kamon/webapp start:debug