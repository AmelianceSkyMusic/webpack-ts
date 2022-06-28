// Generated using webpack-cli https://github.com/webpack/webpack-cli
// >----------------------------------------------------------------<
// >                            REQUIRE                             <
// >----------------------------------------------------------------<

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;


// ^------------------------ add side plugins ------------------------

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // #asm подключения плагина для очистики
const CopyWebpackPlugin = require('copy-webpack-plugin');


// ^------------------------  ------------------------
const filename = (ext) => (isProduction ? `[name].[hash].${ext}` : `[name].${ext}`);




// >----------------------------------------------------------------<
// >                             CONFIG                             <
// >----------------------------------------------------------------<

const config = {
  context: path.resolve(__dirname, 'src'), // #asm указываем глобальный контекст для поиска файлов, уже не нужно кругом писать путь к рабочей директории
  // ????? теперь в файле индексам можно указивать относительный путь через @

	// ^------------------------ Entry ------------------------
	entry: {
		// 'theme-light': './theme-light.js', // #asm основной путь к файлу вхождения в сборку
		// 'theme-dark': './theme-dark.js', // #asm основной путь к файлу вхождения в сборку
		// 'theme-gradient': './theme-gradient.js', // #asm основной путь к файлу вхождения в сборку
		// 'theme-bordered': './theme-bordered.js', // #asm основной путь к файлу вхождения в сборку
		index: './index.ts', // #asm основной путь к файлу вхождения в сборку
		// another: './another.js', // #asm путь к дополнительному файлу
		// для того, что бы не было конфликтов в output нужно задать
		// генерацию уникального имени для filename
		// например filename: '[name]-bundle.js'
	},


	// ^------------------------ Output ------------------------
	output: {
		path: path.resolve(__dirname, 'dist'), // #asm путь к директории выхода
		// filename: 'bundle.js', // #asm имя файла выхода
		filename: filename('js'), // #asm имя файла выхода
		// filename: '[hash]-bundle.js',
		assetModuleFilename: '[path][name].[hash].[ext][query]' // #asm путь к assets к случае подключения и копирования через js
	},


	// ^------------------------ Optimization ------------------------
	// ^------------------------ DevServer ------------------------

	devServer: {
		open: true,
		host: 'localhost',
	},


	// ^------------------------ Plugins ------------------------

	plugins: [
		new HtmlWebpackPlugin({
			template: '../index.html',
      filename: 'index.html', // #asm имя файла выхода
      // filename: '[hash]_another-name.html', // #asm возможность переименовать файл при билде
      // chunks: ['theme-dark', 'theme-light', 'theme-gradient', 'theme-bordered', 'index'], // #asm подключение чанков для вывода
      // minify: false, // #asm отключение минификации
      // minify: true, // #asm отключение минификации
      inject: 'body', // #asm вставка js в конец body
		}),

		new MiniCssExtractPlugin(),

		new CleanWebpackPlugin({  // #asm плагин для очистки
			// cleanStaleWebpackAssets: false // #asm настройка что бы не удалять ассетсы
		}),

		new CopyWebpackPlugin({ // #asm плагин для переноса файлов
      patterns: [
        { from: './assets', to: 'assets' },
        // { from: 'assets/favicon.ico', to: 'assets' },
        // { from: 'assets/img', to: 'assets/img' },
        // { from: 'assets/svg', to: 'assets/svg' },
      ],
    }),

		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],


	// ^------------------------ Modules / Loaders ------------------------

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i, // #asm для комбо +js можно попробовать test: /\.([tj]s|[tj]sx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler,'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [stylesHandler, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},


	// ^------------------------ Resolve ------------------------

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};




// >----------------------------------------------------------------<
// >                          MODULE EXPORT                         <
// >----------------------------------------------------------------<

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';


	} else {
		config.mode = 'development';
	}
	return config;
};
