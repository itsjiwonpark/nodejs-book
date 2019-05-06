const http = require("http");

http
  .createServer((req, res) => {
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기중입니다!");
  });

// http에서 https로 넘어가고 있는 추세.
// http 기본 포트는 80, https 기본 포트는 443

// https는 아무나 할 수 있는 게 아니라 인증서가 필요함
// 암호화 통신이 제대로 되고 있는지 검증해주는 기관에서 발급하는
// 인증서가 필요. (유료도 있고 무료도 있음)
// 무료중에서 가장 유명한게 lets encrypt
