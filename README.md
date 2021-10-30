# lifeworks-assessment

## Installing
- Run `npm install`

## Running the app
- Run `npm run dev`

## Summary of work

### Material UI

Per the instructions I have used material UI, including the data-grid which has sorting and filtering built in. I normally try to code as native and light-weight as possible to obtain the best performance, and maintain the most freedom/flexibility in development. 

If I were to develop sorting and filtering natively I would have created functions that use the array.sort and array.filter methods. These functions would save their results to a 'breachesView' array which would be used to render the results table. The sort/filter methods would be called using onClick attributes on the table header, and both 'breaches' and 'breachesView' would be set on form submit.

### Express server and routes

When I began developing my solution I wanted all strings to originate from the server. This is partially due to my experience in my current role where it is very important, because of language translations, to not hard-code any strings and to get those from the server. As time progressed in doing the assessment I decided that this was unnecessary for the purposes of the assessment which is why you will see some strings originating from the server and others (mostly on the results table) hard-coded.

### If I had more time to dedicate

Things I wish I could have gotten to:
- Create a service file where the api could be called using a dedicated method
- Add mocha tests for the above mentioned service method
- Add a whitelist on the endpoint email field to prevent sql injection and other security issues

