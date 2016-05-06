/**
 * Created by kangkaisen on 15/11/14.
 * turn md file into html
 */
var marked = require('marked');
var toc = require('marked-toc');
var fs = require('fs');
var ejs = require('ejs');
var config = require('../config');
var util = require('./util');
// 自定义Render
var renderer = new marked.Renderer();

// 原始marked生成anchor时不支持中文，这里加入中文支持，以便与TOC相匹配
renderer.heading = function (text, level) {
    return '<h'
        + level
        + ' id="'
        + this.options.headerPrefix
        + text.toLowerCase().replace(/\./g, '').replace(/[^[\w\u0100-\uffff\]]+/g, '-')
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
}

// 开启GFM
marked.setOptions({
    gfm: true,
    renderer: renderer
});


/**
 * 读取ejs模板文件
 * @param  {String} tpl  ejs模板文件名称
 * @return {String}      模板文件内容
 */
var loadTemplate = function (tpl) {
    var path =__dirname+ '/../views/static/' + tpl + '.ejs';
    if (!fs.existsSync(path)) {
       console.error(path + ' can not be found!');
       process.exit(1);
    }

    var tplContent = fs.readFileSync(path, 'utf8');
    console.log('Load ' + path + ' completed!');

    return tplContent;
};

/**
 * 生成ejs模板配置对象
 * @return {Object}  obj  模板文件内容
 */
var buildOpt = function(){
    var obj = {};
    obj.site = config.site;
    obj.author = config.author;
    return obj;
}


exports.compilePosts = function(post){
    var tpl = loadTemplate('post');
    var opts = buildOpt();
    opts.post = post;
    var content = post.content;

    content = toc.insert(content,  {maxDepth: 2});
    content = marked(content);

    opts.post.html = content;
    var html = ejs.render(tpl, opts);
    var output =__dirname+ '/../public/post/' + post.url + '.html';
    fs.writeFileSync(output, html,{encoding: 'utf8'});
    console.log('Build ' + output + ' success!');
}

exports.compilePages = function(posts){
    if (typeof(posts) == undefined || posts.length == 0 ) {
        return;
    }
    var tpl = loadTemplate('page');
    var opts = buildOpt();
    var pages = util.getNewArray(posts, config.page_count);
    if (pages != null && !(pages instanceof Array)) {
        var my_array = [];
        my_array.add(pages);
        pages = my_array;
    }

    for (var i = 0; i < pages.length; i++) {
        opts.pages = pages[i];
        if (i == 0){
            opts.prev = false;
        } else {
            opts.prev = true;
        }

        if (pages.length > 1 && i != pages.length - 1){
            opts.next = true;
        } else {
            opts.next = false;
        }

        opts.id = i + 1;

        var html = ejs.render(tpl, opts);
        var output = __dirname + '/../public/page/' + opts.id + '.html';
        fs.writeFileSync(output, html, {encoding: 'utf8'});
    }
    console.log('Build pages success!');
}

exports.compileTags = function(tag, posts){
    if (typeof(tag) == undefined || typeof(posts) == undefined || posts.length == 0 ) {
        return;
    }
    var tpl = loadTemplate('tag');
    var opts = buildOpt();
    opts.tag = tag;
    var pages = util.getNewArray(posts, config.page_count);
    if (pages != null && !(pages instanceof Array)) {
        var my_array = [];
        my_array.add(pages);
        pages = my_array;
    }

    for (var i = 0; i < pages.length; i++) {
        opts.pages = pages[i];
        if (i == 0){
            opts.prev = false;
        } else {
            opts.prev = true;
        }

        if (pages.length > 1 && i != pages.length - 1){
            opts.next = true;
        } else {
            opts.next = false;
        }

        opts.id = i + 1;

        var html = ejs.render(tpl, opts);
        var output = __dirname + '/../public/tag/' + tag + '.html';
        fs.writeFileSync(output, html, {encoding: 'utf8'});
    }
    console.log('Build tags success!');
}
