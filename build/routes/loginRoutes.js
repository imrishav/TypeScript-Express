"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requiredAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not Permitted');
}
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>You are logged in</div>\n        <a href='/logout'>Logut</a>\n      </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div>You are Not logged in</div>\n      <a href='/login'>Login</a>\n    </div>\n  ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requiredAuth, function (req, res) {
    res.send('Welecome to To protectedRoute ');
});
