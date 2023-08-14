import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { createUserDB, getUserByEmailDB } from "../repositories/user.repository.js";
import { createSessionDB } from "../repositories/auth.repository.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
      const user = await getUserByEmailDB(email);
      if (user.rowCount) return res.status(409).send({ message: "E-mail already in use!" });

      const hash = bcrypt.hashSync(password, 10);
      await createUserDB(name, email, hash);

      res.sendStatus(201);
  } catch (err) {
      res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
      const user = await getUserByEmailDB(email);
      if (!user.rowCount) return res.status(401).send({ message: "E-mail not found!" });

      const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);
      if (!isPasswordCorrect) return res.status(401).send({ message: "Incorrect password!" });

      const token = uuid();
      await createSessionDB(user.rows[0].id, token);
      res.send({ token });
  } catch (err) {
      res.status(500).send(err.message);
  }
}