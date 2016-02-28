/**
 * Created by kangkaisen on 15/11/11.
 */
var mongoose = require('mongoose')
var PostSchema = new mongoose.Schema({
    content:String, //博客内容
    url:String, //博客url
    tag:String, //标签
    title:String, //博客标题
    time:String,  //发布日期
    author:String, //作者
    top:{type:Number,default:0}, //文章是否置顶
    count:{type:Number,default:0} //like_count
})
PostSchema.index({tag: 1});
PostSchema.index({top: -1, time: -1});
mongoose.model('Post', PostSchema);