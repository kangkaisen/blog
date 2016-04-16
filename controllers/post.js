/**
 * Created by kangkaisen on 15/11/14.
 */
var md = require('../lib/md');
var Post = require('../modles').Post;

exports.save = function(req, res){
    Post.savePost(req.body.author, req.body.title, req.body.url, req.body.content, req.body.tag, req.body.time, req.body.top, req.body.count, function(err, post){
        if (post){
            md.compilePosts(post);
            Post.getAllPost(function(err, posts){
                if (posts){
                    md.compilePages(posts);
                }
            })
            Post.getPostByTag(req.body.tag,function(err, posts){
                if (posts){
                    md.compileTags(posts);
                }
            })
            return res.redirect('/');
        }
        return res.sendStatus(404);
    })
}

exports.getAll = function(req, res){
    Post.getAllPost(function(err, posts){
        if (posts){
            return res.json(posts);
        }
        return res.sendStatus(404);
    })
}

exports.getOne = function(req, res){
    Post.getOnePost(req.params.id, function(err, post){
        if (post){
            return res.json(post);
        }
        return res.sendStatus(404);
    })
}

exports.update = function(req, res){
    Post.updatePost(req.params.id, req.body.author, req.body.title, req.body.url, req.body.content, req.body.tag, req.body.time, req.body.top, req.body.count, function(err, post){
        if (err){
            return res.sendStatus(404);
        }

        Post.getOnePost(req.params.id, function(err, post){
            if (post){
                md.compilePosts(post);
            }
        })

        Post.getAllPost(function(err, posts){
            if (posts){
                md.compilePages(posts);
            }
        })

        Post.getPostByTag(req.body.tag, function(err, posts){
            if (posts){
                md.compileTags(req.body.tag, posts);
            }
        })

        return res.redirect('/');
    })
}

exports.delete = function(req, res){
    Post.deletePost(req.params.id, function(err, post){
        if (err){
            res.json({success: 0})
        } else {
            res.json({success: 1})
            Post.getAllPost(function(err, posts){
                if (posts){
                    md.compilePages(posts);
                }
            })
        }

    })
}
exports.inc = function(req, res) {
    Post.incCount(req.params.id, function(err, post){
        if (err){
            return res.statusCode(404);
        }
        return res.sendStatus(200);
    })
}

exports.getAllTags = function (req, res) {
    Post.allTags(function(err, tags){
        if (tags) {
            return res.json(tags);
        }
        return res.sendStatus(404);
    })
}

exports.getPostByTag = function(req, res) {
    Post.getPostByTag(req.params.tag, function(err, posts) {
        if (posts){
            return res.json(posts);
        }
        return res.sendStatus(404);
    })
}