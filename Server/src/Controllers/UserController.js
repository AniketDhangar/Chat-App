import bcrypt from "bcrypt";
import Users from "../Model/UserMod.js";

const login = async (req, res, next) => {
  console.log(req.body);

  try {
    const { username, password } = req.body;

    const userLog = await Users.findOne({ username });
    if (!userLog)
      return res.json({
        msg: "Incorrect username or password! ",
        status: false,
      });

    const isPasswordValid = await bcrypt.compare(password, userLog.password);
    if (!isPasswordValid)
      return res.json({
        msg: "Incorrect username or password! ",
        status: false,
      });
    delete userLog.password;

    return res.json({ status: true, userLog });
  } catch (ex) {
    next(ex);
  }
};




const register = async (req, res, next) => {
  console.log(req.body);

  try {
    const { username, email, password } = req.body;

    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username  already exist", status: false });

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already exist", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export default { register, login };
