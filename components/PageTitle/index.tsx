import React, {FC} from 'react';

import css from './PageTitle.module.css';

interface PageTitleProps {
	title: string,
	subtitle: string
}

const ContentBlock: FC<PageTitleProps> = ({title, subtitle}) => {
    return(
		<div className={css['page-title']}>
			<h1 className={css['title']}>{title}</h1>
			<h3 className={css['subtitle']}>{subtitle}</h3>
		</div>
	)
}

export default ContentBlock;
