import express from "express";
const router = express.Router();

import { getAllPatient, createPatient, updatePatient, getGraph, deletePatient} from "../controllers/pasien.js";

router.get("/all", getAllPatient);
router.get("/alldata", getGraph);
router.post("/create", createPatient);
router.put("/update/:id", updatePatient);
router.delete("/delete/:id", deletePatient);


//router = -
// metod = POST, url=/pasien/all, fungsi=getAllpasien
export default router;
