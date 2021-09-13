const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models/index');
const app = express();

dotenv.config();

db.sequelize.sync()
  .then(() => {
    console.log('연결 성공');
  })
  .catch(console.error);

passportConfig();

app.use(cors({
  origin: 'http://localhost:3060',
  credentials: true,
  /* 서로간의 쿠키 전달:
  프론트의 axios에서는 withCredentials: true,
  백엔드에서는 cors에서 credentials: true
  */
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});
