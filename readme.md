# EsLint 및 Prettier 설치

###### 참고: https://minjung-jeon.github.io/eslint-prettier-intellij/

1. EsLint 설치
   npm install -g eslint
   Language & Frameworks > JavaScript > Code Quality Tools > ESLint 선택  
   Automatic ESLint Configuration 체크
   Run eslint --fix on save도 체크
2. Prettier 설치
   Terminal에 다음을 입력합니다.
   npm install --save-dev --save-exact prettier // 정확히 일치하는 버전의 패키지를 추가한다.
   Ctrl + Alt + S -> Plugins 탭에서 Prettier install
   Language & Frameworks > JavaScript > Libraries 선택 Download 클릭 Prettier 설치
   Language & Frameworks > JavaScript > Prettier 선택
   Prettier Packages: ~\AppData\Roaming\npm\node_modules\prettier 선택합니다.
   On save 체크
   Keymap에서 Prettier > Reformat with Prettier에 Ctrl + S 로 등록. 기존 등록(Ctrl+ Alt + Shift + P) 삭제

# DB 설정

## MariaDB 설치

1. 'nodetest' DataBase 생성

2. 아래 쿼리 실행
   `CREATE TABLE userTable (
id int(12) NOT NULL AUTO_INCREMENT,
username varchar(50) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY(id)
) charset=utf8;`

`CREATE TABLE visitinfo (
rowid int(12) NOT NULL AUTO_INCREMENT,
username varchar(50) NOT NULL,
phone varchar(13) NOT NULL,
carnumber varchar(12) NOT NULL,
PRIMARY KEY(rowid)
) charset=utf8;`
