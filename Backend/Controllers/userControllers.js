import { connection } from "../Utiles/db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const userRegister=( async (req, res) => {
    const { firstName, lastName, address, mobileNumber, email, password } = req.body;
    console.log(req.body);
    
    try {
        connection.query("SELECT COUNT(*) AS count FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "An error occurred while checking email existence."
                });
            }
            const emailCount = result[0].count;
            
            if (emailCount > 0) {
                // Email already exists, send response
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            } else {
                try {
                    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

                    connection.query("INSERT INTO users (firstName, lastName, address, mobileNumber, email, password) VALUES (?, ?, ?, ?, ?, ?)", [firstName, lastName, address, mobileNumber, email, hashedPassword], (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: false,
                                message: "An error occurred while registering user."
                            });
                        } else {
                            console.log('Registration successful');
                            return res.status(200).json({
                                success: true,
                                message: "Registration successful"
                            });
                        }
                    });
                } catch (hashError) {
                    console.log(hashError);
                    return res.status(500).json({
                        success: false,
                        message: "An error occurred while hashing password."
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred."
        });
    }
});

export const userLogin= (async(req,res) =>{
    const{email,password} = req.body
    console.log(req.body) 
    try{
        connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "An error occurred while checking email existence."
                });
        }
        console.log('hello')
        if(result.length === 0){
            return res.status(500).json({
                success:false,
                message:"user not found"
            })
        }
        const hashedPassword = result[0].password;
      const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

      if (isPasswordMatched) {
        const payload = {
          email: result[0].email,
        };
        const jwt_token = jwt.sign(payload, "triveni");
        return res.status(200).json({
            success:true,
            message:"login succesfull",
            jwt_token
        })
      } else {

        return res.status(500).json({
            success:false,
            message:"password incorrect"
        }) 
         }
    })
    
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred."
        });
    }
})