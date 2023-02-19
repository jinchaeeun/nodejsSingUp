var maria = require('mysql2');

var db = maria.createConnection({
	host: '127.0.0.1',
	port: '3306',
	user: 'root',
	password: 'jin1234',
	database: 'nodetest',
});
db.connect();

module.exports = db;

// Connection refused: no further information 오류 시 Window Service에서 MariaDB 우클릭 서비스 시작
