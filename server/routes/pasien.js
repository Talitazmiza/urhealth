import express from "express";
const router = express.Router();

import { getAllPatient, createPatient, updatePatient, getData } from "../controllers/pasien.js";

router.get("/all", getAllPatient);
router.post("/create", createPatient);
router.put("/update/:id", updatePatient);
router.get("/showdata", getData);

//router = -
// metod = POST, url=/pasien/all, fungsi=getAllpasien
export default router;
