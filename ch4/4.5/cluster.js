const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length; // cpu갯수를 볼 수 있음

// 노드는 항상 싱글스레드임(cpu코어를 하나밖에 안씀)
// 근데 보통 서버를 돌릴 때 cpu코어를 하나만 쓰는 경우는 거의 없음
// 코어가 4개인 서버에서 싱글스레드인 노드를 실행하면 코어를 하나밖에 안쓰게 됨.
// 서버 돈은 코어 4개쓰는 만큼 지불하는데 하나만 쓰면 돈이 아까움
// 그런 경우에 cluster로 clustering을 할 수 있음
// clustring이란 노는 코어들을 다 활용하는 방법
// 즉, 멀티프로세싱을 하는 방법

if (cluster.isMaster) {
  // 클러스터에는 master(관리자)모드와 worker(일꾼)모드가 있음
  // 관리자는 일꾼들을 관리하는 역할
  // 일꾼은 실제로 일하는 사람들
  console.log(`마스터 프로세스(관리자) 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때(일을 너무 열심히 하다가 쓰러지는 경우)
  // 이벤트가 발생함
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    cluster.fork(); // 하나가 쓰러졌으니까 하나를 더 만들어주는 것
  });
} else {
  // 워커들이 포트에서 대기
  // 워커들이 요청을 나눠서 받음
  http
    .createServer((req, res) => {
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Cluster!</p>");
      setTimeout(() => {
        process.exit(1); // 요청을 받고나서 워커들을 종료시키게 하면 8개가 찍히는 걸 볼 수 있음
      }, 1000);
    })
    .listen(8085);

  console.log(`${process.pid}번 워커 실행`);
}
// 이렇게 하면 노는 코어 없이 서버가 멀티프로세싱으로 생성이 됨.
