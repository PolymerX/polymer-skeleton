webpack-dev-server --hot &
node build_utils/postcss-build.js
pid=$!
kill $pid
