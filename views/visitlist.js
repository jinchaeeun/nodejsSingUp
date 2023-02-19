module.exports = {
	HTML: function (title, list, body, control) {
		return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
	},

	list: function (topics) {
		// 인자 topics에 main.js template.list(topics)의 topics이 들어옴
		var list = '<ul>';

		topics.map((x, i) => {
			list =
				list +
				`<li>${x.username}&nbsp;${x.phone}&nbsp;${x.carnumber}</li>`;
			// topics 각 id와 title 값이 링크 주소와 이름이 됨
			i = i + 1;
		});
		list = list + '</ul>';
		console.log('list', list); // 무한대기
		return list;
	},
};
