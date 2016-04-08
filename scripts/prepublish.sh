echo "> Start transpiling ES2015"
echo ""
./node_modules/.bin/babel --plugins "transform-runtime" src --out-dir ./dist
echo ""
echo "> Complete transpiling ES2015"
