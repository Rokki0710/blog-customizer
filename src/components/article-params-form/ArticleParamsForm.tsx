import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	customOptions: (options: {
		font: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => void;
	resetOptions: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	// Состояние для управления видимостью формы параметров
	const [isOpen, setIsFormOpen] = useState(false);
	
	const toggleForm = () => {
		setIsFormOpen(!isOpen);
	};
	
	const formRef = useRef<HTMLDivElement>(null);
	
	// Хук для закрытия формы при клике вне её области
	useOutsideClickClose({
		isOpen: isOpen,
		onChange: setIsFormOpen,
		onClose: () => setIsFormOpen(false),
		rootRef: formRef,
	});
	
	// Состояния для каждого параметра статьи
	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	// Сбрасывает все параметры к значениям по умолчанию
	function reset() {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		props.resetOptions();
	}

	// Применяет выбранные параметры и закрывает форму
	function applyChanges() {
		props.customOptions({
			font: font.value,
			fontSize: fontSize.value,
			fontColor: fontColor.value,
			backgroundColor: backgroundColor.value,
			contentWidth: contentWidth.value,
		});
		setIsFormOpen(false);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<label className={styles.formLabel}>Задайте параметры</label>
					<Select
						title='шрифт'
						selected={font}
						options={fontFamilyOptions}
						onChange={setFont}
					/>
					<RadioGroup
						title='размер шрифта'
						selected={fontSize}
						options={fontSizeOptions}
						name='font-size'
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={reset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={applyChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};