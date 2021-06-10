import jwt from "jsonwebtoken";
import Role from './../models/roles.js'
import User from './../models/user.js'

//const secret = 'test';
const auth = {
  verifyToken (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, 'test');

        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;
      }

      next();
    } catch (error) {
      console.log(error);
    }
  },
  isDokter(req, res, next){
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.findOne(
          {
            _id: user.role
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

              if (roles.name === "Dokter") {
                next();
                return;
              }

            res.status(403).send({ message: "Require Dokter Role!" });
            return;
          }
      );
    });
  },
  isKlinik(req, res, next){
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.findOne(
          {
            _id:  user.role
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if (roles.name === "Klinik") {
              next();
              return;
            }

            res.status(403).send({ message: "Require Klinik Role!" });
            return;
          }
      );
    });
  },
  isPasien(req, res, next){
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.findOne(
          {
            _id: user.role
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if (roles.name === "Pasien") {
              next();
              return;
            }
            res.status(403).send({ message: "Require Pasien Role!" });
            return;
          }
      );
    });
  }

}
export default auth;
