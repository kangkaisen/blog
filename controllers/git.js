/**
 * Created by kangkaisen on 16/6/3.
 */

var execFile = require('child_process').execFile;

exports.postHook = function(req, res){
    if (req.header('X-GitHub-Event') == 'push'){
        execFile('../lib/post-receive.sh', function(error, stdout, stderr) {
            if (error) {
                console.error(error);
            } else {
                console.log( 'blog Finished Deploy' );
            }
        });
    }
    return res.sendStatus(200);
}