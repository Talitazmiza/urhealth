
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import pasienRouter from "./routes/pasien.js";

import Role from './models/roles.js';
import Patient from './models/pasien.js';
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRouter);
app.use('/patient', pasienRouter); //url base buat  -> /pasien/all, /pasien/delete/{id}, /

const CONNECTION_URL = 'mongodb://user17:Talitaiza17@cluster0-shard-00-00.kqihq.mongodb.net:27017,cluster0-shard-00-01.kqihq.mongodb.net:27017,cluster0-shard-00-02.kqihq.mongodb.net:27017/users?ssl=true&replicaSet=atlas-jak5hd-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
          initial();
          app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
function initial() {
   Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "Dokter",
                id : 1
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'dokter' to roles collection");
            });

            new Role({
                name: "Patient",
                id : 2
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'pasien' to roles collection");
            });

            new Role({
                name: "Klinik",
                id : 3
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'perawat' to roles collection");
            });
        }
    });
}
