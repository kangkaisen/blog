/**
 * Created by kangkaisen on 15/12/18.
 */
var Post = require('../modles').Post;
var config = require('../config');

//后台管理
exports.admin = function(req, res) {
    if (req.session.sign){
        Post.getAllPost(function(err, posts){
            if (posts){
                return res.render('list', {posts: posts, site: config.site, author: config.author});
            } else {
                return res.sendStatus(404);
            }
        })
    } else {
        res.render('signin');
    }
}

//登录
exports.signin = function(req, res) {
    if (req.body.name == config.author.user_name && req.body.password == config.author.user_password) {
        req.session.sign = true;
        res.redirect('/admin');
    } else {
        res.sendStatus(400);
    }
}

//更新文章
exports.postUpdate = function(req, res) {
    if (req.session.sign){
        Post.getOnePost(req.params.id, function(err, post){
            if (post){
                return res.render('updatePost', {post: post});
            }
            return res.sendStatus(404);
        })
    } else {
        res.render('signin');
    }

}

//新建文章
exports.postCreate = function(req, res) {
    if (req.session.sign){
        return res.render('createPost', {author: config.author});
    } else {
        res.render('signin');
    }
}