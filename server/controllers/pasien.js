import Patient from '../models/pasien.js';
import UserModal from '../models/user.js';
import mongoose from "mongoose";
import Grafik from "../models/data.js";

// READ patients
export const getAllPatient = async (req, res) => {
    try {
        Patient.find().populate(
            {
                path: 'user_data',
                populate: {
                    path: 'role',
                },
            }
        ).populate(
            {
                path: 'data_grafik',
            }
        ).exec((err, patient) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!patient) {
                return res.status(404).json({message: "patient doesn't exist"});
            }
            res.status(200).send({
                result: patient
            });
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// CREATE patients
export const createPatient = async (req, res) => {
    const {email, weight, height, bloodtype, lastName, firstName, data_grafik} = req.body;
    try {
        const existingUser = await UserModal.findOne({email});
        if (!existingUser) return res.status(400).json({message: "User tidak ada"});
        const existingGrafik = await Grafik.findById(data_grafik);
        console.log(data_grafik);
        const result = await Patient.create({
            email,
            height,
            weight,
            firstName,
            lastName,
            bloodtype,
            user_data: existingUser._id,
            data_grafik: existingGrafik._id
        });
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});

        console.log(error);
    }
};

// UPDATE patients
export const updatePatient = async (req, res) => {
    const {id} = req.params;
    const {height, weight, firstName, lastName, bloodtype} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    const updatedPatient = {height, weight, firstName, lastName, bloodtype};
    await Patient.findByIdAndUpdate(id, updatedPatient, {new: true});
    res.json(updatedPatient);
};

// export const updatePatient = async (req, res) => {
//     const { id: _id } = req.params;
//     const patient = req.body;
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
//     const existingUser = await UserModal.findOne({ email });
//     const updatedPatient = { email, height, weight, firstName, lastName, bloodtype, user_data : existingUser._id, _id: id };
//     await Patient.findByIdAndUpdate(_id,{ ...patient, _id },{ new: true });
//     res.json(updatedPatient);
// }

// DELETE patients
export const deletePatient = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No patient with id: ${id}`);
    await Patient.findByIdAndRemove(id);
    res.json({message: "Patient deleted successfully."});
}


export const getGraph = async (req, res) => {
    try {
        const graphData = await Grafik.find();

        res.status(200).json({
            result: graphData[0].data_grafik
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const addGraph = async (req, res) => {
    const {data_grafik} = req.body;
    try {
        const result = await Grafik.create({data_grafik});
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});

        console.log(error);
    }
}
export const patientProfile = async (req, res) => {
    const {id} = req.params;
    const user_data = id;
    try {
        Patient.findOne({user_data}).populate(
            {
                path: 'user_data',
                populate: {
                    path: 'role',
                }
            }
        ).exec((err, patient) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!patient) {
                return res.status(404).json({message: "patient doesn't exist"});
            }
            res.status(200).send({
                result: patient
            });
        });

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};
