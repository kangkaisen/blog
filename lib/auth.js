/**
 * Created by kangkaisen on 16/4/16.
 */

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
    if (!req.session || !req.session.sign) {
        return res.sendStatus(400);
    }
    next();
};