var http = require("http");
    fs = require("fs");
var html = fs.readFileSync("./plantilla.html");
var template = fs.readFileSync("./miplantilla.html");
var miservicioEvento = function (request, response) {
    console.log("HOLA MUNDO");
    
    response.writeHead(200, {"Content-type": "text/html", "REFERENCIA":"LOCAL DITMAR"});
    var results = html.toString().match(/data-iurl="(.+?")/g);
    var listahtml = "<ul>";
    for (var i = 0; i < results.length; i++) {
        var imgs = results[i].replace(/data-iurl=\"/, "").replace(/\"/, "");
        listahtml += (`<li><img src = "${imgs}"/></li>`);
        //console.log(imgs);
    }
    listahtml += "</ul>";
    console.log(listahtml);
    var datos = {"lista" : listahtml};
    template = template.toString().replace(/\{.+?\}/g, function (keys) {
        var key = keys.replace(/\{/, "").replace(/\}/,"");
        return datos[key];
    });
    response.write(listahtml);
    response.end();
}
var server = http.createServer(miservicioEvento);
var port = 8090;
server.listen(port, function () {
    console.log("Servidor corriendo en " + port);
});