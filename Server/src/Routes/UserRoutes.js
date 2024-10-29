import express from "express";
import {register} from "../Controllers/UserController.js"; 


const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
    const regData = req.body
    console.log(regData)
    res.send({ message: 'User registered successfully' });
});


// userRouter.post('/login', (req, res) => {
//     const logData = req.body
//     console.log(logData)
//     res.send({ message: 'User Login successfully' });
// });

userRouter.post("/register",register)
userRouter.post("/login",login)



export default userRouter; 
