const express = require('express');
const bodyParser = require('body-parser')
const next = require('next');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

const dev = process.env.NODE_ENV === 'development' || typeof process.env.NODE_ENV === 'undefined';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
	const router = express.Router();

	server.enable("strict routing");

	server.use(compression());
	server.use(cookieParser());

	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());

	server.use(router);
	server.use(`/static`, express.static('static'));

	router.post('/breaches', (req, res) => {
		fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${req.body.email}?truncateResponse=false`, {
			headers: {
				'hibp-api-key': 'bd61ec7bda7446e0a14cde2e5e5bdb18'
			}
		}).then((response) => {
			response.json().then((data) => {
				let transformed = data.map((breach, idx) => {
					breach.id = idx; // Required for data-grid
					return breach;
				})
				res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store' });
				res.end(JSON.stringify(transformed));
			}).catch((e) => {
				console.error(e);
				res.writeHead(500, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store' });
				res.end(JSON.stringify({failed: true}));
			})
		}).catch((e) => {
			console.error(e);
			res.writeHead(500, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store' });
			res.end(JSON.stringify({failed: true}));
		})
	})


    router.get([/^((?!_next)(?!sw.js)(?!static).)*$/], (req, res) => {
		let data = {
			components: [{
				component: 'page-title',
				title: 'Threat Level Midnight',
				subtitle: 'An email checker to make sure that Goldenface has not stolen your email'
			},{
				component: 'email-form',
				emailFieldLabel: 'Email',
				emailFieldPlaceholder: 'example@example.com',
				submitButtonText: 'Submit'
			}]
		}
		if (req.query.json || req.query.json === '') {
			res.writeHead(res.statusCode, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store' });
			res.end(JSON.stringify(data));
		} else {
			app.render(req, res, '/Template', data);
		}
        
	});
	
	router.get(`*_next*`, (req, res) => {
        return handle(req, res);
	});
	
    server.listen(process.env.PORT || 3000, (err) => {
        if (err) throw err;
        console.log(`> Ready on port ${process.env.PORT || 3000}`);
    });
});
