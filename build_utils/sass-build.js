const path = require('path');
const fs = require('fs-extra');

const sass = require('node-sass');
const pkgConf = require('pkg-conf');

const main = () => {
	console.info(sass.info);
	const sassConf = pkgConf.sync('sass');
	console.log(sassConf);

	for (let file of sassConf.files) {
		const pathToCSS = (file.split('.')[0] + '.css').replace('sass', 'css').replace('scss', 'css');
		const result = sass.renderSync({
			file: path.resolve(file),
			outputStyle: 'compressed',
			outFile: pathToCSS,
			sourceMap: true // or an absolute or relative (to outFile) path
		});

		fs.ensureFileSync(pathToCSS);
		fs.writeFileSync(pathToCSS, result.css);
	}
};

try {
	main();
} catch (err) {
	console.error(err);
}
