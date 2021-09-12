const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');  // db.User을 가져오는 것

const router = express();

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {  // 서버에러
      console.error(err);
      return next(err);
    }
    if (info) { // 클라이언트 에러
      return res.status(401).send(info.reason);
    }
    return req.logIn(user, async (loginErr) => {
      try {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        // 비밀번호 제외하고 Posts, Followings, Followers를 추가한 user를 프론트로 보낸다.
        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password'],
          },
          include: [{
            model: Post, // hasMany라서 model: Post가 복수형이 되어 me.Posts가 됩니다.
          }, {
            model: User,
            as: 'Followings',
          }, {
            model: User,
            as: 'Followers',
          }],
        });
        return res.json(fullUserWithoutPassword);
      } catch (err) {
        console.error(err);
        next(err);
      }
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  console.log(req.user);
  req.logout();
  req.session.destroy();
  res.send('ok');
})

// 회원가입
router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);  // status 500
  }
});

module.exports = router;
