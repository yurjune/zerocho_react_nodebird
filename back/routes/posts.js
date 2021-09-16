const express = require('express');
const { Op } = require('sequelize');
const { Post, Image, Comment, User } = require('../models');
const router = express();

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }
    const posts = await Post.findAll({
      // lastId보다 작은 id의 게시글을 limit개 만큼 불러오기
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      },{
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      },{
        model: Image,
      },{
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
