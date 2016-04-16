/**
 * Created by kangkaisen on 15/11/11.
 */
var models = require('../schemas');
var Post = models.Post;

//获取所有文章
exports.getAllPost=function(callback){
    Post.find({}, null, {sort:{top: -1, time: -1}}, callback);
}

//获取文章
exports.getOnePost = function (id, callback) {
    Post.findOne({_id: id}, callback);
};

//更新文章
exports.updatePost = function (id, author, title, url, content, tag, time, top ,count, callback) {
    if (typeof(count) == "undefined") {
        count = 0;
    }
    var conditions = {_id : id};
    var update = {$set : { author: author, title:title, url:url, content:content, tag:tag, time:time, top:top, count:count}};
    Post.update(conditions, update, callback);
};

//保存文章
exports.savePost = function (author, title, url, content, tag, time, top ,count, callback) {
    var post = new Post();
    post.author = author;
    post.title = title;
    post.url = url;
    post.content = content;
    post.tag = tag;
    post.time = time;
    post.top = top;
    post.count = count;
    post.save(callback);
};

//删除文章
exports.deletePost = function (id, callback) {
    Post.remove({_id: id}, callback);
}

//like更新
exports.incCount = function (id, callback) {
    Post.update({_id: id},{ $inc: { "count": 1 }}, callback);
}

//获取tag
exports.allTags = function(callback) {
    Post.distinct('tag', callback);
}

//根据tag获取文章列表
exports.getPostByTag = function(tag, callback) {
    Post.find({tag : tag}, null, callback);
}