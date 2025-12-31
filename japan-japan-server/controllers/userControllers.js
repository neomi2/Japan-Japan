import { userModel } from "../models/user.js";
import {hashSync, compareSync } from "bcryptjs"

export const addUser = (req, res) => { 
    if (!req.body)
        return res.status(400).json({ title: "missing body", message: "no data" })
    let { userName, userPassword, userEmail} = req.body
    if (!userName || !userPassword || !userEmail)
        return res.status(400).json({ title: "missing data", message: "username, password, email are required" })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        return res.status(400).json({
            title: "invalid email",
            message: "email format is not valid"
        })
    }
    

    userModel.findOne({ userEmail }).then(already => {
        if (already)
            return res.status(409).json({ title: "duplicate user", message: "a user with the same email already exists" })
        let hashedPassword = hashSync(userPassword, 10)
        const newUser = new userModel({ userName, userPassword: hashedPassword, userEmail})
        newUser.save()
            .then(user => {
                let { userPassword, ...other } = user.toObject();

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
    if (!req.body) 
        return res.status(400).json({ title: "missing body", message: "no data" })

    let { userEmail, userName, userPassword } = req.body

    if ((!userEmail && !userName) || !userPassword)
        return res.status(400).json({ title: "missing data", message: "email or username, and password are required" })

    const query = userEmail ? { userEmail } : { userName }

    userModel.findOne(query).then(user => {
        if (!user)
            return res.status(404).json({ title: "invalid credentials", message: "user not found" })

        let isMatch = compareSync(userPassword, user.userPassword)
        if (!isMatch)
            return res.status(404).json({ title: "invalid credentials", message: "password is incorrect" })

        let { userPassword, ...other } = user.toObject()
        return res.json(other)
    }).catch(err => {
        return res.status(500).json({ title: "Error logging in", message: err })
    })
}


export const getUsers = (req, res) => {
    userModel.find({}, { userPassword: 0 }).then(users => {
        return res.json(users)
    }).catch(err => {
        return res.status(500).json({ title: "Error retrieving users", message: err })
    })
}
