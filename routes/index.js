var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	// res.render('signUp', {title: 'Expres'});
	if (!authCheck.isOwner(req, res)) {
		// 로그인 안되어있으면 로그인 페이지로 이동시킴
		res.redirect('/auth/login');
		return false;
	} else {
		// 로그인 되어있으면 메인 페이지로 이동시킴
		res.redirect('/main');
		return false;
	}
});

module.exports = router;
