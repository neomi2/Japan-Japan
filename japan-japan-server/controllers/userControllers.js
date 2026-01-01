import { userModel } from "../models/user.js";
import {hashSync, compareSync } from "bcryptjs"

export const addUser = (req, res) => { 
    if (!req.body)//Check if the client sent any data
        return res.status(400).json({ title: "missing body", message: "no data" })
    let { userName, userPassword, userEmail} = req.body// Get the username, password and email from the request
    if (!userName || !userPassword || !userEmail)//if one of the username, password, email is missing
        return res.status(400).json({ title: "missing data", message: "username, password, email are required" })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Check if the email is in a valid format
    if (!emailRegex.test(userEmail)) {//Checking if the email is invalid
        return res.status(400).json({
            title: "invalid email", message: "email format is not valid"
        })
    } 
    

    userModel.findOne({ userEmail }).then(alreadyexist => {
        if (alreadyexist)//if there is user like this
            return res.status(409).json({ title: "duplicate user", message: "a user with the same email already exists" })
        let hashedPassword = hashSync(userPassword, 10)//Converts the password ממיר
        const newUser = new userModel({ userName, userPassword: hashedPassword, userEmail})//Creates a new user object with the encrypted password.מוצפן
        newUser.save()//saving the new user
            .then(user => {
                let { userPassword, ...other } = user.toObject();
                // Remove password from the saved user before sending it to the client
                return res.status(201).json(other)
            })
            .catch(err => {
                return res.status(500).json({ title: "Error creating user", message: err })
            })
    })
        .catch(err => {
            return res.status(500).json({ title: "Error creating user", message: err })
        })


}
export const login = (req, res) => {
    if (!req.body) //Check if the client sent any data
        return res.status(400).json({ title: "missing body", message: "no data" })

    let { userEmail, userName, userPassword } = req.body// Get the username, password and email from the request

    if ((!userEmail && !userName) || !userPassword)//if one of the username, password, email is missing
        return res.status(400).json({ title: "missing data", message: "email or username, and password are required" })

    const query = userEmail ? { userEmail } : { userName }//find the user by email or name

    userModel.findOne(query).then(user => {
        if (!user)//if user not found
            return res.status(404).json({ title: "invalid credentials", message: "user not found" })

        let isMatch = compareSync(userPassword, user.userPassword)// Check if the input password matches the password in the database

        if (!isMatch)//if not match
            return res.status(404).json({ title: "invalid credentials", message: "password is incorrect" })

        let { userPassword, ...other } = user.toObject()
         // Remove password from the saved user before sending it to the client
        return res.json(other)
    }).catch(err => {
        return res.status(500).json({ title: "Error logging in", message: err })
    })
}


export const getUsers = (req, res) => {
    userModel.find({}, { userPassword: 0 }).then(users => {// Find all users and return all details without the password
        return res.json(users)//return all the users as json
    }).catch(err => {
        return res.status(500).json({ title: "Error retrieving users", message: err })
    })
}
