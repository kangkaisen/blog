/**
 * Created by kangkaisen on 15/11/14.
 */

var md = require('../lib/md');
var Post = require('../modles').Post;

//保存文章
exports.save = function(req, res){
    Post.savePost(req.body.author, req.body.title, req.body.url, req.body.content, req.body.tag, req.body.time, req.body.top, req.body.count, function(err, post){
        if (post){
            md.compilePosts(post);
            Post.getAllPost(function(err, posts){
                if (posts){
                    md.compilePages(posts);
                    md.compileRss(posts);
                }
            })
            Post.getPostByTag(req.body.tag,function(err, posts){
                if (posts){
                    md.compileTags(req.body.tag, posts);
                }
            })
            return res.redirect('/');
        }
        return res.sendStatus(404);
    })
}

//获取所有文章
exports.getAll = function(req, res){
    Post.getAllPost(function(err, posts){
        if (posts){
            return res.json(posts);
        }
        return res.sendStatus(404);
    })
}

//根据id获取一篇文章
exports.getOne = function(req, res){
    Post.getOnePost(req.params.id, function(err, post){
        if (post){
            return res.json(post);
        }
        return res.sendStatus(404);
    })
}

//更新文章
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
                md.compileRss(posts);
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

//更新所有文章
exports.updateAll = function(req, res){
        Post.getAllPost(function(err, posts){
            if (posts){
                for (var i = 0; i < posts.length; i++) {
                    md.compilePosts(posts[i]);
                }
                md.compilePages(posts);
                md.compileRss(posts);
            }
        })
        return res.sendStatus(200);
}


//删除文章
exports.delete = function(req, res){
    Post.deletePost(req.params.id, function(err, post){
        if (err){
            res.json({success: 0})
        } else {
            res.json({success: 1})
            Post.getAllPost(function(err, posts){
                if (posts){
                    md.compilePages(posts);
                    md.compileRss(posts);
                }
            })

            Post.getPostByTag(post.tag, function(err, posts){
                if (posts){
                    md.compileTags(posts.tag, posts);
                }
            })
        }

    })
}

//like + 1
exports.inc = function(req, res) {
    Post.incCount(req.params.id, function(err, post){
        if (err){
            return res.statusCode(404);
        }
        return res.sendStatus(200);
    })
}

//获取所有文章标签
exports.getAllTags = function (req, res) {
    Post.allTags(function(err, tags){
        if (tags) {
            return res.json(tags);
        }
        return res.sendStatus(404);
    })
}

//根据标签获取文章
exports.getPostByTag = function(req, res) {
    Post.getPostByTag(req.params.tag, function(err, posts) {
        if (posts){
            return res.json(posts);
        }
        return res.sendStatus(404);
    })
}