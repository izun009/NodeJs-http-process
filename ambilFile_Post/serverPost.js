var http = require('http'),
    PORT = 5060;
var qs = require('querystring');
var fs = require('fs');

var server = http.createServer((req,res)=>{

    if(req.url == "/login/" && req.method == "GET"){
        // tampilkan form login
        fs.readFile("login.html",(err,data) => {
            if(err){//kirim error jika error
                res.writeHead(404,{
                    'Connection':'Active',
                    'Content-Type':'text/html',
                    'Message':'Belajar GET dan POST suatu FORM'
                });
                return res.end('404 File Not Found');
            }
            //kirim form login.html
            res.writeHead(200,{
                'Connection':'Active',
                'Content-Type':'text/html',
                'Message':'Belajar GET dan POST suatu FORM'
            });
            res.write(data);
            return res.end();   
        });
    }

    if(req.url == "/login/" && req.method == "POST"){
        // ambil data dari form dan proses
        var requestBody = '';
        req.on('data',(data)=>{
            // tangkap data dari form
            requestBody += data;

            // kirim balasan jika datanya terlalu besar
            if(requestBody.length > 1e7) {
                res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
                res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            };
        });
    
        //kita sudah dapat datanya, lalu tinggal di parse
        req.on('end', function() {
        var formData = qs.parse(requestBody);

        // cek login
        if( formData.username === "izzun" && formData.password === "qwerty"){
            res.writeHead(200, {
                'Connection':'Active',
                'Content-Type':'text/html',
                'Message':'Belajar GET dan POST suatu FORM'
            });
            res.write('<h2>Selamat datang bos!</h2>');
            res.write('<p>username: '+formData.username+'</p>');
            res.write('<p>password: '+formData.password+'</p>');
            res.write("<a href='/login/'>kembali</a>");
            res.end();
        } else {
            res.writeHead(200, {
                'Connection':'Active',
                'Content-Type':'text/html',
                'Message':'Belajar GET dan POST suatu FORM'
            });
            res.write('<h2>Login Gagal!</h2> ');
            res.write("<a href='/login/'>coba lagi</a>");
            res.end();
            }
        });
    }
});
server.listen(PORT);
console.log('Server running in port 5060...');