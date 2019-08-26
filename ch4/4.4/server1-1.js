const https = require("https");
const fs = require("fs");

// https는 아무나 할 수 있는 게 아니라 인증서가 필요함
// 암호화 통신이 제대로 되고 있는지 검증해주는 기관에서 발급하는
// 인증서가 필요. (유료도 있고 무료도 있음)
// 무료중에서 가장 유명한게 lets encrypt
https
  .createServer(
    {
      // 인증서를 발급받으면 파일을 세 개는 줌.
      cert: fs.readFileSync("도메인 인증서 경로"),
      key: fs.readFileSync("도메인 비밀키 경로"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로")
      ]
    },
    (req, res) => {
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Server!</p>");
    }
  )
  .listen(443, () => {
    console.log("443번 포트에서 서버 대기중입니다!");
  });

// http는 아무런 옵션 없이 써도 되지만
// https는 createServer의 첫 번째 인자로
// 인증서 정보를 넣어주어야 함.
// ssl은 무엇이며 인증서는 무엇인가? https://wiki.kldp.org/HOWTO/html/SSL-Certificates-HOWTO/x70.html

/**
 * 1. 웹브라우저: ssl로 암호화된 페이지를 요청함
 * 2. 웹서버: 공개키와 인증서를 함께 전송함
 * 3. 웹브라우저: 인증서가 믿을만한 곳에서 서명한 건지 체크함. 날짜가 유효한지, 접속하려는 사이트와 관련이 있는지 체크.
 * 4. 웹브라우저: 공개키를 이용해 랜덤대칭공개키랑 데이터들을 암호화해서 서버에 보냄
 * 5. 웹서버: 비밀키를 이용해 받은 데이터들을 복호화하고 랜덤대칭키를 이용해 응답정보를 암호화해서 브라우저에 전송함.
 * 6. 웹브라우저: 대칭키를 이용해서 http 데이터와 html 문서를 복호화하고 화면에 뿌려줌.
 *  */
