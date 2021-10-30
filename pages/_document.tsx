import Document, { Html, Head, Main, NextScript } from "next/document";

class MasterDocument extends Document {
	static async getInitialProps({ renderPage, req }) {
		let pageProps;
		const page = renderPage(App => props => {pageProps = props; return (<App {...props} />)})
		return { ...page, pageProps }
	};

	render() {
		return (
			<Html lang={'en-US'}>
				<Head>
					<title>Threat Level Midnight - Is your data compromised?</title>
				</Head>
				<body>
					<div className="content-container">
						<Main />
					</div>
					<NextScript />
				</body>
			</Html>
		);
	}
}


export default MasterDocument;
