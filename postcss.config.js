module.exports = ({ file, options, env }) => ({
	parser: file.extname === '.css' ? 'sugarss' : false,
	// .css (SugarSS) => use sugarss parser (SugarSS Parser)
	// .(less|sass) (CSS) => use css parser (PostCSS Parser)
	plugins: {
		'postcss-import': {},
		'postcss-cssnext': {},
		'autoprefixer': {},
		'cssnano': {}
	}
});