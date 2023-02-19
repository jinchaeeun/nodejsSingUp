var express = require('express');
var router = express.Router();

var template = require('../views/template.js');
var visitlist = require('../views/visitlist.js');
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
		<form name='getvisitlist' action="/main/getvisitlist/" method="post">
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
router.post('/getvisitlist', function (request, response) {
	var username = request.body.username;

	if (username) {
		db.query('SELECT * FROM visitinfo', function (error, results, fields) {
			// DB에 등록한 정보가 있는지 확인
			if (error) throw error;
			if (results.length >= 0) {
				results.map((x, index) => {
					console.log(index, '---', x);
				});

				var title = 'Welcome';
				var description = 'Hello, Node.js';
				var list = visitlist.list(results); // list의 인자로 topics 데이터를 전달
				var html = visitlist.HTML(
					title,
					list,
					`<h2>${title}</h2>${description}`,
					`<a href="#">가짜</a>`,
				);

				// response.redirect('/auth/login', {results: 'k'});
				// response.send(
				// 	`<script type="text/javascript">alert("등록된 정보가 있습니다.", ${results[0].rowid} )</script>`,
				// );
			} else {
				response.send(
					`<script type="text/javascript">alert("등록된 정보가 없습니다.")</script>`,
				);
				// document.location.href="/main/home";</script>`);
			}
		});
	} else {
		// 입력되지 않은 정보가 있는 경우
		response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        // document.location.href="/main/home";</script>`);
	}
});

module.exports = router;
