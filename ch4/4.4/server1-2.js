const http2 = require("http2");
const fs = require("fs");

// http2는 속도에 이점이 있음.(최신 버전-실험적인 모듈이라 익스프레스랑 호환 문제가 이씀)
// http2는 https 기반으로 동작하므로 https만 http2로 바꿔줄 수 있음. 인증서가 필요함
// 익스프레스랑 호환 문제가 있음

http2
  .createSecureServer(
    {
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
