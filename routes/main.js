var express = require('express');
const app = express();
app.use(express.json());
var router = express.Router();

var template = require('../views/template.js');
var visitlist = require('../views/visitlist.js');
// var listView = require('../views/list.js');
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
		'챈 컴퍼니',
		`<hr>
        <h2>챈 컴퍼니에 오신 것을 환영합니다</h2>
        <p>방문 정보를 입력하세요</p>
		<form action="/main/register_visiting" method="post">
		<p><input class="login" type="text" name="username" placeholder="이름"></p>
		<p><input class="login" type="tel" name="phone" required
  		oninput="hypenTel(this)" maxlength="13" placeholder="연락처 010-1234-5678"></p>    
		<p><input class="login" type="text" maxlength="12" name="carnumber" placeholder="차량번호"></p>
<!--		<p><input class="login" type="date" name="startdate" placeholder="방문 시작일시"></p>-->
<!--		<p><input class="login" type="date" name="enddate" placeholder="방문 종료일시"></p>-->
		<p><input class="btn" type="submit" value="제출"></p>
		</form>
		<form name='getvisitlist' action="/main/visitlist" method="post">
		<input class="login" type="hidden" name="username" value=${req.session.nickname}>
		</form>
		<p><a href="#" onclick="javascript:document.getvisitlist.submit();">방문 등록 정보 조회</a></p>`,
		authCheck.statusUI(req, res),
	);
	res.send(html);
});

// 방문자 등록 프로세스
router.post('/register_visiting', function (request, response) {
	var username = request.body.username;
	var phone = request.body.phone;
	var carnumber = request.body.carnumber;
	// var startdate = request.body.startdate;
	// var enddate = request.body.enddate;

	if (username && phone && carnumber) {
		db.query(
			'SELECT * FROM visitinfo WHERE carnumber = ?',
			[carnumber],
			function (error, results, fields) {
				// DB에 같은 차량 정보가 있는지 확인
				if (error) throw error;
				if (results.length <= 0) {
					// DB에 같은 차량 정보 등록 안된 경우
					db.query(
						'INSERT INTO visitinfo (username, phone, carnumber) VALUES(?,?,?)',
						[username, phone, carnumber],
						function (error, data) {
							if (error) throw error2;
							response.send(`<script type="text/javascript">alert("차량 등록이 완료되었습니다.");
                    		document.location.href="/";</script>`);
						},
					);
				} else {
					// DB에 같은 차량이 이미 등록된 경우
					response.send(`<script type="text/javascript">alert("이미 등록된 차량입니다."); 
                	// document.location.href="/main/home";
                	</script>`);
				}
			},
		);
	} else {
		// 입력되지 않은 정보가 있는 경우
		response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        </script>`); // document.location.href="/main/home";
	}
});

// 방문자 정보 조회
router.post('/visitlist', function (request, response) {
	var username = request.body.username;

	if (username) {
		db.query('SELECT * FROM visitinfo', function (error, results) {
			// DB에 등록한 정보가 있는지 확인
			if (error) throw error;
			response.render('list', {title: '방문 등록 내역', rows: results});
		});
	} else {
		// 입력되지 않은 정보가 있는 경우
		response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다.");
	    // document.location.href="/main/home";</script>`);
	}
});

module.exports = router;
