#!/bin/bash

gcc -x c -E sha256.js.hpp | sed 's@^#@//@g' > sha256.js
