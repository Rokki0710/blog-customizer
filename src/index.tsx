import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	type styleValues = {
		font: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	};

	const defaultOptions = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};

	const [options, setOptions] = useState(defaultOptions);

	const customOptions = (newCustomOptions: styleValues) => {
		setOptions({
			'--font-family': newCustomOptions.font,
			'--font-size': newCustomOptions.fontSize,
			'--font-color': newCustomOptions.fontColor,
			'--container-width': newCustomOptions.contentWidth,
			'--bg-color': newCustomOptions.backgroundColor,
		});
	};

	const resetOptions = () => {
		setOptions(defaultOptions);
	};

	return (
		<main className={clsx(styles.main)} style={options as CSSProperties}>
			<ArticleParamsForm
				customOptions={customOptions}
				resetOptions={resetOptions}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);