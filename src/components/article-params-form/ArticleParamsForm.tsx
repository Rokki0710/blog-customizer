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
	ArticleStateType,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	setCustomOptions: (options: ArticleStateType) => void;
	initialState: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsFormOpen] = useState(false);
	
	const toggleForm = () => {
		setIsFormOpen(!isOpen);
	};
	
	const formRef = useRef<HTMLDivElement>(null);
	
	useOutsideClickClose({
		isOpen: isOpen,
		onChange: setIsFormOpen,
		onClose: () => setIsFormOpen(false),
		rootRef: formRef,
	});
	
	const [font, setFont] = useState(props.initialState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(props.initialState.fontSizeOption);
	const [fontColor, setFontColor] = useState(props.initialState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		props.initialState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		props.initialState.contentWidth
	);

	const reset = () => {
		setFont(props.initialState.fontFamilyOption);
		setFontSize(props.initialState.fontSizeOption);
		setFontColor(props.initialState.fontColor);
		setBackgroundColor(props.initialState.backgroundColor);
		setContentWidth(props.initialState.contentWidth);
		props.setCustomOptions(props.initialState);
	};

	const applyChanges = () => {
		props.setCustomOptions({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
		setIsFormOpen(false);
	};

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