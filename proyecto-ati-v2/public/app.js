window.onload = inicializar;
var lamparas;
var elementos;
var agregarLampara;
var eliminarLampara;

function inicializar(){

    lamparas = document.getElementById("lamparas");

    agregarLampara = document.getElementById("agregar-lampara");
    agregarLampara.addEventListener("click", agregarLamparaFirebase, false);
    
    eliminarLampara = document.getElementById("eliminar-lampara");
    eliminarLampara.addEventListener("click", eliminarLamparaFirebase, false);    

    mostrarLamparas();
}

function mostrarLamparas(){   
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'https://proyecto-ati-v2.firebaseapp.com/api/lamparas', true);
    xhr.onload = function(){
        var datos = [] 
        datos = JSON.parse(xhr.responseText);        
        var lamparasAMostar = "";
        for(var key in datos){           
            lamparasAMostar +=  
            "<td style = 'padding: 30px'>" + 
            "<img class='mis-lamparas' key-lampara=" + key + " estado="+ datos[key].estado +" src='img/pic_" + datos[key].estado + ".gif' style='width:100px; cursor: pointer;'>" +
            "</td>";          
        }
        lamparas.innerHTML = lamparasAMostar;       
        elementos = document.getElementsByClassName("mis-lamparas");     
        for(var i=0; i < elementos.length; i++){
            elementos[i].addEventListener("click",switchEstadoLampara, false);
        }       
    }   
    xhr.send(); 
}

function switchEstadoLampara(){
    var keyLamparaUpdate = this.getAttribute("key-lampara");
    var estadoLamparaUpdate = this.getAttribute("estado");
    var xhr = new XMLHttpRequest();
    if( estadoLamparaUpdate == "bulboff"){
        xhr.open('PUT','https://proyecto-ati-v2.firebaseapp.com/api/lamparas/'+ keyLamparaUpdate + '/bulbon');                   
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {};
        xhr.send();            
    }
    else{
        xhr.open('PUT','https://proyecto-ati-v2.firebaseapp.com/api/lamparas/'+ keyLamparaUpdate + '/bulboff'); 
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {};
        xhr.send();              
    }
    mostrarLamparas();
}

function agregarLamparaFirebase(){
    if(elementos.length < 5)
    {
        var xhr = new XMLHttpRequest();
        xhr.open('POST','https://proyecto-ati-v2.firebaseapp.com/api/lamparas/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {};
        xhr.send();
        eliminarLampara.disabled=  false;
    }
    else
    {
        agregarLampara.disabled = true;
    }
    mostrarLamparas();
}

function eliminarLamparaFirebase(){    
    if(elementos.length > 1){
        var keyLamparaEliminar = elementos[elementos.length -1].getAttribute("key-lampara");        
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE','https://proyecto-ati-v2.firebaseapp.com/api/lamparas/' + keyLamparaEliminar);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {};
        xhr.send();
        agregarLampara.disabled = false;
    }
    else{
        eliminarLampara.disabled=  true;
    }
    mostrarLamparas();
}