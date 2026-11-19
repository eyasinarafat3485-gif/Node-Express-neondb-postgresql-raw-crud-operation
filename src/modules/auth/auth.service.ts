import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // check if the user exist -- done
  // check if the password match -- done
  // check the user status -- done
  // if pass all then generate jwt token -- done

  const { email, password } = payload;

  const user = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email],
  );
  //   console.log(user.rows[0]);
  if (user.rowCount === 0) {
    throw new Error("Invalid credentials!");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }
  //   console.log(user.rows[0].is_active);
  if (!user.rows[0].is_active) {
    throw new Error("Access denied!");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };
  const accessToken = jwt.sign(jwtPayload, "mdeyasinarafatwebdev", {
    expiresIn: "1d",
  });
  delete user.rows[0].password;
  return {accessToken, user : user.rows[0]};
};

export const authService = {
  loginUserIntoDB,
};
