var express = require('express');
var router = express.Router();

var template = require('../lib_login/template.js');
var db = require('../db');
var authCheck = require('../lib_login/authCheck.js');

// 메인 페이지
router.get('/home', function (req, res) {
	if (!authCheck.isOwner(req, res)) {
		// 로그인 안되어있으면 로그인 페이지로 이동시킴
		res.redirect('/auth/login');
		return false;
	}
	var html = template.HTML(
		'Welcome',
		`<hr>
        <h2>메인 페이지에 오신 것을 환영합니다</h2>
        <p>로그인에 성공하셨습니다.</p>`,
		authCheck.statusUI(req, res),
	);
	res.send(html);
});

module.exports = router;
