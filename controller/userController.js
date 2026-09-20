const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userModel = require('../model/userModel.js');


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const user = await userModel.create({
            name, email, password: hashedPassword
        });
        return res.status(201).json({
           message: "User created successfully",
           data: user 
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email}).select("+password")

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"})
        }
        return res.status(200).json({message: "Login successful", data: user})
    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getAllUsers = async (req, res) => {
    try{
        const getAll = await userModel.find()
        return res.status(200).json({
            message: "All users fetched successfully",
            data: getAll
       })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}        

 const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params

         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const getSingle = await userModel.findById(id)

        if (!getSingle) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User fetched successfully",
            data: getSingle
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

 const updateUser = async (req, res) => {
    try {
        const { userId } = req.params
        const { name, password } = req.body

        const updateData = {name}

        if (password) {
            const genSalt = await bcrypt.genSalt(10)
            updateData.password = await bcrypt.hash(password, genSalt)
        }

        const update = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        )

        if (!update) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User updated successfully",
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


 const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        const deleteUser = await userModel.findByIdAndDelete(userId)
        return res.status(200).json({
            message: "User deleted successfully",
            data: deleteUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { createUser, loginUser, getAllUsers, getSingleUser, updateUser, deleteUser }