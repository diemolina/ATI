var http = require("http");

var manejador = function(solicitud,respuesta){
	console.log("Node up");
	respuesta.end("Node up");
};

var servidor = http.createServer(manejador);

servidor.listen(8080);
