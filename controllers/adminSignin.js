const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const dotenv = require ('dotenv');
const adminDb = JSON.parse(fs.readFileSync('./adminDb.json', 'UTF-8'))
const validateAdminSignin = require('../helpers/signin');

dotenv.config();

const signin = (req,res) => {
    const { email, password } = req.body;

    //Validate user inputs
    const { error } = validateAdminSignin.validation(req.body);
    if(error) {
        return res.status(400).json({ status:400, error: error.details[0].message});
    }
    const admin = adminDb.admin.find(e => e.email === email);
    if(!admin) {
        return res.status(404).json({
            status:404,
            message:'User not found',
        });
    }
    const comparePassword = bcrypt.compareSync(password.trim(), admin.password);
    if(!comparePassword){
        return res.status(400).json({
            status:400,
            error:'Incorrect password'
        });
    }

    const payload = {
       email: admin.email,
       password: admin.password,

    }
    const SECRET_KEY = '123456789'
    //if everything is correct
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '24hrs'});
    return res.status(200).json({
        status:200,
        data: {
            token,
            id:admin.id,
            email:admin.email,
        },
    });
};

module.exports = signin;
