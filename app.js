const express = require ('express');
const bodyParser = require ('body-parser');
const adminSignin = require ('./routes/adminSignin');



const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req, res) => res.status(200).json(
    {
        message: 'Welcome to our Online Payroll Platform'
    }
));

app.use('/api/v1', adminSignin);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
});
module.exports = app;