import Patient from '../models/pasien.js';
import UserModal from '../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import data from "../models/data.js";

export const getAllPatient = async (req, res) => {
    try {
        Patient.find().populate(
            {
                path: 'user_data',
                populate: {
                    path: 'role',
                }
            }
        ).exec((err, patient)=> {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!patient) {
                return res.status(404).json({ message: "patient doesn't exist" });
            }
            res.status(200).send({
                result : patient
            });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createPatient = async (req, res) => {
    const { email, tinggi_badan, goldar, lastName, firstName } = req.body;
    try {
        const existingUser = await UserModal.findOne({ email });
        if (!existingUser) return res.status(400).json({ message: "User tidak ada" });

        const result = await Patient.create({ tinggi_badan, firstName, lastName, goldar, user_data : existingUser._id });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { email, ttl, tinggi_badan, goldar, lastName, firstName } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    const existingUser = await UserModal.findOne({ email });
    const updatedPatient = { ttl, tinggi_badan, goldar, lastName, firstName,user_data : existingUser._id, _id: id };
    await Patient.findByIdAndUpdate(id, updatedPatient, { new: true });
    res.json(updatedPatient);
}

export const getData = async (req, res) => {
    try {
        const graphData = await data.find();

        res.status(200).send({
            result : graphData
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
