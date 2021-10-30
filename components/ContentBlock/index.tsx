import React, {FC} from 'react';

import css from './ContentBlock.module.css';

interface ContentBlockProps {
	content: string
}

const ContentBlock: FC<ContentBlockProps> = ({content}) => {
    return(
		<div className={css['content-block']}>
				<div className={css['content']} dangerouslySetInnerHTML={{__html: content}}></div>
		</div>
	)
}

export default ContentBlock;
