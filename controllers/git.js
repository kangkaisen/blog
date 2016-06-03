/**
 * Created by kangkaisen on 16/6/3.
 */

exports.postHook = function(req, res){
    if (req.header('X-GitHub-Event') == 'push'){
        run_cmd('sh', ['/home/kks/git/blog/lib/post-receive.sh'], function(text){ console.log(text) });
    }
    return res.sendStatus(200);
}


function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function() { callback (resp) });
}