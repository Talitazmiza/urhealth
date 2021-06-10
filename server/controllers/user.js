import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModal from "../models/user.js";
import RoleModal from "../models/roles.js"
//const secret = 'test';

export const signin = (req, res) => {
  const { email, password } = req.body;

  try {
    UserModal.findOne({ email }).populate('role').exec((err, user)=> {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }

      var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });

      res.status(200).send({
        result: {
          id: user._id,
          username: user.name,
          email: user.email,
          roles: user.role
        },
        token
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, role } = req.body;
  try {
    const existingUser = await UserModal.findOne({ email });
    const selectedRole = await RoleModal.findOne({name : role});
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, role : selectedRole._id });

    const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
