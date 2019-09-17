const fs = require('fs');
const dotenv = require ('dotenv');
const adminDb = JSON.parse(fs.readFileSync('./adminDb.json', 'UTF-8'))
const validateAddEmployees = require('../helpers/employees');

dotenv.config();

const addEmployees = (req,res) => {

    //Validate user inputs
    const { error } = validateAddEmployees.validation(req.body);
    if(error) {
        return res.status(400).json({ status:400, error: error.details[0].message});
    }
        const id = parseInt(adminDb.employees.length + 1, 10);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const address = req.body.address;
        const mobile = req.body.mobile;
        const salary = req.body.salary;
        const status = req.body.status;
        const maritalStatus = req.body.maritalStatus;

    fs.readFile("./adminDb.json", (err, data) => {  
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        };
    
        // Get current users data
        // JSON.parse converts string of json text into a object, stringify does the opposite
        var data = JSON.parse(data.toString());
    
        // Get the id of last user
        var last_item_id = data.employees[data.employees.length-1].id;
    
        //Add new user
        data.employees.push({id: last_item_id + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            mobile: req.body.mobile,
            salary: req.body.salary,
            status: req.body.status,
            maritalStatus: req.body.maritalStatus
        }); //add some data

        var writeData = fs.writeFile("./adminDb.json", JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
              const status = 401
              const message = err
              res.status(status).json({status, message})
              return
            }
        });
    });
 
    return res.status(201).json({
        status:201,
        data: {
            message: "employee added",
            id,
            firstName,
            lastName,
            email,
            address,
            mobile,
            salary,
            status,
            maritalStatus,
        },
    });
};

module.exports = addEmployees;
