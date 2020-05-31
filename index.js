const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Sever start...."));

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 이멜을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "User not found!",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비번이 맞는 비번인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Password is not correct!",
        });

      // 비번까지 맞다면 토큰 생성.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // token을 저장한다. 어디? 쿠키, 로컬스토리지
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.post("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어(auth)를 통과해왔다는 말은 authertication이 true라는 말
  res.status(200).json({
    _id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.emil,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
