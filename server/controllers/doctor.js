import mongoose from "mongoose";
import Doctor from '../models/doctor.js';
import UserModal from '../models/user.js';

// READ doctors
export const getAllDoctor = async (req, res) => {
    try {
        Doctor.find().populate(
            {
                path: 'user_data',
                populate: {
                    path: 'role',
                }
            }
        ).exec((err, doctor)=> {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!doctor) {
                return res.status(404).json({ message: "doctor doesn't exist" });
            }
            res.status(200).send({
                result : doctor
            });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// CREATE doctors
export const createDoctor = async (req, res) => {
    const { fullName, email, sip, category, practicePlace, totalPatient } = req.body;
    try {
        const existingUser = await UserModal.findOne({ email });
        if (!existingUser) return res.status(400).json({ message: "User tidak ada" });

        const result = await Doctor.create({ fullName, email, sip, category, practicePlace, totalPatient, user_data : existingUser._id });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

// UPDATE doctors
export const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, sip, category, practicePlace, totalPatient } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    const existingUser = await UserModal.findOne({ email });
    const updatedDoctor = { fullName, email, sip, category, practicePlace, totalPatient, user_data : existingUser._id, _id: id };
    await Doctor.findByIdAndUpdate(id, updatedDoctor, { new: true });
    res.json(updatedDoctor);
}

// UPDATE doctors profile
export const updateDoctorProfile = async (req, res) => {
    const { id } = req.params;
    const { fullName, password, email, sip, category, practicePlace, totalPatient } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    const existingUser = await UserModal.findOne({ email });
    const updatedDoctor = { fullName, password, email, sip, category, practicePlace, totalPatient, user_data : existingUser._id, _id: id };
    await Doctor.findByIdAndUpdate(id, updatedDoctor, { new: true });
    res.json(updatedDoctor);
}

// DELETE doctors
export const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No doctor with id: ${id}`);
    await Doctor.findByIdAndRemove(id);
    res.json({ message: "Doctor deleted successfully." });
}

