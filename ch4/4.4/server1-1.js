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
