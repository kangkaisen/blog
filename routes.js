var express = require('express');
var auth = require('./lib/auth');
var post = require('./controllers/post');
var user = require('./controllers/user');
var router = express.Router();

router.get('/blog',  auth.userRequired, post.getAll);                     //获取博客
router.post('/blog', auth.userRequired, post.save);                      //发布指定博客
router.post('/blog/:id', auth.userRequired, post.update);                //更新指定博客
router.get('/blog/:id', auth.userRequired, post.getOne);                 //获取指定博客
router.delete('/blog/:id', auth.userRequired, post.delete)               //删除指定博客
//router.get('/blog/like/:id', auth.userRequired, post.inc);              //更新指定博客like count

router.get('/tags', auth.userRequired, post.getAllTags);   //获取所有博客标签
router.get('/tags/:tag', auth.userRequired, post.getPostByTag);   //根据标签获取博客

router.get('/admin/update', auth.userRequired, post.updateAll);   //更新所有博客


router.get('/admin/blog/:id', user.postUpdate);
router.get('/admin/blog', user.postCreate);
router.get('/admin', user.admin);
router.post('/signin', user.signin);

module.exports = router;
