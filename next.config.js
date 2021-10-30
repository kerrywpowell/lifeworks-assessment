
module.exports = {
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1
	},
	generateEtags: false,
    webpack: (config) => {
		config.output.publicPath = `${config.output.publicPath}`;
		config.resolve.fallback = {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }

		config.module.rules[3].oneOf.forEach((moduleLoader, i) => {
			Array.isArray(moduleLoader.use) && moduleLoader.use.forEach((l) => {
				if (l.loader.includes("css-loader") && !l.loader.includes("postcss-loader")) {
					const { getLocalIdent, ...others } = l.options.modules;
					l.options = {
						...l.options,
						modules: {
							...others,
							localIdentName: "[local]",
						}
					};
				}
			});
		});

		return config;
    }
}
