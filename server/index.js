
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import pasienRouter from "./routes/pasien.js";
import doctorRouter from "./routes/doctor.js";
import Role from './models/roles.js';
const app = express();
import Grafik from "./models/data.js";
import User from "./models/user.js";
import Patient from "./models/pasien.js";
import faker from 'faker';
import bcrypt from "bcryptjs";
app.use(cors())

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

faker.locale = "id_ID";

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
app.use('/posts', postRoutes);
app.use('/user', userRouter);
app.use('/patient', pasienRouter); //url base buat  -> /pasien/all, /pasien/delete/{id}, /
app.use('/doctor', doctorRouter);

const CONNECTION_URL = 'mongodb://root:root@cluster0-shard-00-00.z4mps.mongodb.net:27017,cluster0-shard-00-01.z4mps.mongodb.net:27017,cluster0-shard-00-02.z4mps.mongodb.net:27017/ewaras?ssl=true&replicaSet=atlas-jr0z7l-shard-0&authSource=admin&retryWrites=true&w=majority';

// set port, listen for requests
const PORT = process.env.PORT|| 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
          initial();
          app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomBloodtype() {
    const bloodtype = ["O", "B", "O+", "O-", "B+", "B-", "A", "A+", "A-", "AB", "AB+", "AB-"]
    const min = 0;
    const max = bloodtype.length;
    return bloodtype[Math.floor(Math.random() * (max - min + 1) + min)];
}
function initial() {
   Grafik.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            for (let i = 0; i < 50; i++) {
                new Grafik({
                    data_grafik : [
                        {
                            metric: "gsr",
                            value: randomIntFromInterval(1, 10)
                        },
                        {
                            metric: "hr",
                            value: randomIntFromInterval(60, 200)
                        },
                        {
                            metric: "spo2",
                            value: randomIntFromInterval(90, 100)
                        },
                        {
                            metric: "pulse",
                            value: randomIntFromInterval(60, 200)
                        },
                        {
                            metric: "resp",
                            value: randomIntFromInterval(12, 50)
                        },
                        {
                            metric: "temperature",
                            value: randomIntFromInterval(35, 40)
                        }
                    ]
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("data added");
                });
            }
        }
    });
   User.estimatedDocumentCount( async (err, count) => {
       const selectedRole = await Role.findOne({name : "Pasien"});
       if (!err && count === 0) {
            for (let i = 0; i < 50; i++) {
                new User({
                    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    email: faker.internet.email(faker.name.firstName(), faker.name.lastName()),
                    password: await bcrypt.hash('password',12),
                    role: selectedRole._id
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("data added");
                });
            }
        }
    });
   Patient.estimatedDocumentCount( async (err, count) => {
       const users = await User.find();
       const grafik = await Grafik.find();

       if (!err && count === 0) {
            for (let i = 0; i < users.length; i++) {
                new Patient({
                    firstName: users[i].name.split(' ')[0],
                    lastName: users[i].name.split(' ')[1],
                    bloodtype: randomBloodtype(),
                    height: randomIntFromInterval(150, 185),
                    weight: randomIntFromInterval(30, 200),
                    user_data: users[i]._id,
                    data_grafik:grafik[i]._id
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("data added");
                });
            }
        }
    });
}
