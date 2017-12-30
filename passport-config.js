var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var db = require('./security');

// Configure the Basic strategy for use by Passport.
//
// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.

function configurePassportStrategy() {
    var basicStrategy = new Strategy(
        function (username, password, cb) {
            db.accounts.findByUsername(username, function (err, user) {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    return cb(null, false);
                }
                if (user.password != password) {
                    return cb(null, false);
                }
                return cb(null, user);
            });
        }
    );
    passport.use(basicStrategy);
    return passport;
}

module.exports = {
    configurePassportStrategy: configurePassportStrategy
};