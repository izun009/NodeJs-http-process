var http = require('http'),
    PORT = process.env.PORT || 4040;
var url = require('url');
var fs = require('fs');

var server = http.createServer((req,res) => {

    var a = url.parse(req.url, true);
    var key = a.query.key;
    
    if(a.pathname == '/search/' && req.method == 'GET'){
        var body = "<h3>Search Results</h3>"
         + "<p>Anda mencari: <b>" + key + "</b></p>"
         + "<pre>Tidak ada hasil! Maaf website ini masih dalam pengembangan</pre>";
        
        res.writeHeader(200, {
            'Connection':'Active',
            'Content-Type':'text/html',
            'Message':'Belajar GET dan POST suatu FORM'
        });
        res.write(body);
        res.end("<a href='/'>Kembali</a>");
    }else {
        // tampilkan form search
        fs.readFile('search.html', (err, data) => {
        if (err) { // kirim balasan error
            res.writeHead(404, {
                'Connection':'Active',
                'Content-Type':'text/html',
                'Message':'Belajar GET dan POST suatu FORM'
            });
            return res.end("404 Not Found");
        } 
        // kirim form search.html
        res.writeHead(200, {
                'Connection':'Active',
                'Content-Type':'text/html',
                'Message':'Belajar GET dan POST suatu FORM'
        });
        res.write(data);
        return res.end();
        });
    }
});
server.listen(PORT);
console.log('Server running in port 4040...');