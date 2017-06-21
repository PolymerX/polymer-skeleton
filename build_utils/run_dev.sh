webpack-dev-server --hot &
node build_utils/postcss-build.js --file=template.html
pid=$!
kill $pid
