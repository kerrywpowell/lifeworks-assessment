import {NextPage, NextPageContext} from 'next';
import React from 'react';

import PageTitle from '../../components/PageTitle';
import ContentBlock from '../../components/ContentBlock';
import EmailForm from '../../components/EmailForm';

import css from './Template.module.css';

interface Component {
	component: string,
	title: string,
	content: string,
	emailFieldLabel: string,
	emailFieldPlaceholder: string,
	submitButtonText: string
}

interface Props {
	components: Array<Component>
}

export default class Template extends React.Component<Props> {
	static async getInitialProps(params: NextPageContext) {
		return params.query
	}
	render() {
		const {components = []} = this.props;
		return (
			<div className={css['template']}>
				<div>
				{
					components.map((component, key) => {
						switch(component.component) {
							case 'page-title':
								return <PageTitle key={key} {...component}></PageTitle>
							case 'content-block': 
								return <ContentBlock key={key} {...component}></ContentBlock>
							case 'email-form': 
								return <EmailForm key={key} {...component}></EmailForm>
						}
					})
				}
				</div>
			</div>
		)
	}
}
