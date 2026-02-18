import { userModel } from "../models/userModel.js";
import { hashSync, compareSync } from "bcryptjs";

export const addUser = (req, res) => { 
    if (!req.body)//Check if the client sent any data
        return res.status(400).json({ title: "missing body", message: "no data" })
    let { userName,userLastName, userPassword, userEmail} = req.body// Get the username, password and email from the request
    if (!userName || !userLastName|| !userPassword || !userEmail)//if one of the username, password, email is missing
        return res.status(400).json({ title: "missing data", message: "username ,userLastName, password, email are required" })
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
        const newUser = new userModel({ userName, userPassword: hashedPassword,userLastName, userEmail})//Creates a new user object with the encrypted password.מוצפן
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



export const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // בדיקה: חייבים גם אימייל וגם סיסמה
    if (!userEmail || !userPassword) {
      return res.status(400).json({
        title: "Missing data",
        message: "Both email and password are required",
      });
    }

    // חיפוש משתמש לפי אימייל בלבד
    const user = await userModel.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        title: "Invalid credentials",
        message: "User not found",
      });
    }

    // השוואת סיסמה
    const isMatch = compareSync(userPassword, user.userPassword);

    if (!isMatch) {
      return res.status(401).json({
        title: "Invalid credentials",
        message: "Password is incorrect",
      });
    }

    // הסרת הסיסמה מהתשובה
    const { userPassword: _, ...safeUser } = user.toObject();

    return res.json(safeUser);

  } catch (err) {
    return res.status(500).json({
      title: "Error logging in",
      message: err.message,
    });
  }
};

 

export const getUsers = (req, res) => {
    userModel.find({}, { userPassword: 0 }).then(users => {// Find all users and return all details without the password
        return res.json(users)//return all the users as json
    }).catch(err => {
        return res.status(500).json({ title: "Error retrieving users", message: err })
    })
}
