/**
 * Created by kangkaisen on 15/12/18.
 */

var Post = require('../modles').Post;
var config = require('../config');

exports.admin = function(req, res) {
    if (req.session.sign){
        console.log(req.session);
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

exports.signin = function(req, res) {
    if (req.body.name == config.author.user_name && req.body.password == config.author.user_password) {
        req.session.sign = true;
        req.session.name = req.body.name;
        req.session.password = req.body.password;
        console.log(req.session);
        res.redirect('/admin');
    } else {
        res.sendStatus(400);
    }
}

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

exports.postCreate = function(req, res) {
    if (req.session.sign){
        return res.render('createPost', {author: config.author});
    } else {
        res.render('signin');
    }
}