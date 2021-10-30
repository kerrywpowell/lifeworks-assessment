import React, {createRef} from 'react';
import {TextField, Button} from '@mui/material';
import ResultsList from '../ResultsList';
import css from './EmailForm.module.css';

interface EmailFormProps {
	emailFieldLabel: string,
	emailFieldPlaceholder: string,
	submitButtonText: string,
	form: Element
}

interface Breach {
	id: BigInteger,
	Title: string,
	Domain: string,
	BreachDate: string,
	PwnCount: BigInteger,
	Description: string,
	IsVerified: boolean,
	IsFabricated: boolean,
	IsSensitive: boolean
}

interface EmailFormState {
	breaches: Array<Breach>,
	loading: boolean,
	serverError: boolean
}

export default class EmailForm extends React.Component<EmailFormProps, EmailFormState> {
	private form = createRef<HTMLFormElement>()
	private emailField = createRef<HTMLInputElement>()
	constructor(props) {
		super(props);
		
		this.state = {
			breaches: [],
			loading: false,
			serverError: false
		}

		this.checkEmail = this.checkEmail.bind(this);
	}
	checkEmail(e) {
		e.preventDefault();
		this.setState({
			loading: true,
			serverError: false
		})
		let form = e.target;
		if (form.checkValidity()) {
			fetch('/breaches', {
				method: 'POST',
				body: JSON.stringify({
					email: form.querySelector('input[name=email]').value
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				response.json().then((data) => {
					this.setState({
						breaches: data,
						loading: false
					});
				}).catch((e) => {
					this.setState({
						serverError: true,
						loading: false
					})
				})
			}).catch((e) => {
				this.setState({
					serverError: true,
					loading: false
				})
			})
		}
		
	}
    render() {
		let {emailFieldLabel, emailFieldPlaceholder, submitButtonText} = this.props

		return (
			<div className={css['email-form']}>
				<form onSubmit={this.checkEmail} ref={this.form}>
					<div>
						<div className={css['form-field']}>
							<TextField 
								label={emailFieldLabel} 
								type="email" 
								name="email" 
								placeholder={emailFieldPlaceholder} 
								variant="outlined"
								required={true}
								ref={this.emailField}
								sx={{width: '300px', maxWidth: '100%'}}
							></TextField>
						</div>
						<div className={css['button-container']}>
							<Button type="submit" variant={'contained'}>{submitButtonText}</Button>
						</div>
					</div>
				</form>
				{
					this.state.loading ? (
						<div className={css.loading}>
							<img src="https://johnrieber.files.wordpress.com/2019/12/michael-scott-in-threat-level-midnight-movie.jpg"/>
						</div>
					) : null
				}
				{
					this.state.serverError ? (
						<div className={css.error}>
							An error occured
						</div>
					) : null
				}
				{
					this.state.breaches.length > 0 ? (
						<ResultsList breaches={this.state.breaches}/>
					) : null
				}
			</div>
			
		)
	}
}

