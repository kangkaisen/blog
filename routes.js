var express = require('express');
var config = require('./config');
var post = require('./controllers/post');
var user = require('./controllers/user');
var router = express.Router();

if (config.debug == true) {
    router.get('/blog', post.getAll);                     //获取博客
    router.post('/blog', post.save);                      //发布指定博客
    router.post('/blog/:id', post.update);                //更新指定博客
    router.get('/blog/:id', post.getOne);                 //获取指定博客
    router.delete('/blog/:id', post.delete)               //删除指定博客
    router.get('/blog/like/:id', post.inc);              //更新指定博客like count

    router.get('/tags', post.getAllTags);   //获取所有博客标签
    router.get('/tags/:tag', post.getPostByTag);   //根据标签获取博客
}

router.get('/admin/blog/:id', user.postUpdate);
router.get('/admin/blog', user.postCreate);
router.get('/admin', user.admin);
router.post('/signin', user.signin);

module.exports = router;