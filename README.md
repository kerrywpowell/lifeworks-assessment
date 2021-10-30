# lifeworks-assessment

## Installing
- Run `npm install`

## Running the app
- Run `npm run dev`

## Summary of work

Per the instructions I have used material UI, including the data-grid which has sorting and filtering built in. I normally try to code as native and light-weight as possible to obtain the best performance, and maintain the most freedom/flexibility in development. 

If I were to develop sorting and filtering natively I would have created functions that use the array.sort and array.filter methods. These functions would save their results to a 'breachesView' array which would be used to render the results table. The sort/filter methods would be called using onClick attributes on the table header, and both 'breaches' and 'breachesView' would be set on form submit.
