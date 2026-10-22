#!/bin/sh
# Bump asset version before commit: ./bump.sh
V=$(date +%Y%m%d%H%M)
sed -i -E "s#style.css\?v=[0-9]+#style.css?v=$V#; s#app.js\?v=[0-9]+#app.js?v=$V#" index.html
sed -i -E "s#svc.json\?v=[0-9]+#svc.json?v=$V#" app.js
echo "v=$V"
