const http = require('http');
const fs = require('fs');
let port = 2317

let serv = http.createServer((req, res) => {
  // 
  if(req.method === 'GET' && req.url === '/'){
    
  }
})

serv.listen(port, ()=>{
  console.log(`
please click with under url
http://localhost:${port}
`)
})