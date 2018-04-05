window.onload = inicializar;
var lamparas;
var elementos;
var dbRefLamparas;
var agregarLampara;
var eliminarLampara;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBUu-3Ce1Uo1o__ACNkf50k6Nc_bA8d5k8",
    authDomain: "proyecto-ati.firebaseapp.com",
    databaseURL: "https://proyecto-ati.firebaseio.com",
    projectId: "proyecto-ati",
    storageBucket: "proyecto-ati.appspot.com",
    messagingSenderId: "489448652494"
  };

function inicializar(){

    firebase.initializeApp(config);

    //lampara.addEventListener("click", switchEstadoLampara, false);      
    lamparas = document.getElementById("lamparas");

    agregarLampara = document.getElementById("agregar-lampara");
    agregarLampara.addEventListener("click", agregarLamparaFirebase, false);
    
    eliminarLampara = document.getElementById("eliminar-lampara");
    eliminarLampara.addEventListener("click", eliminarLamparaFirebase, false);

    dbRefLamparas = firebase.database().ref().child("lamparas");

    mostrarLamparasFirebase();
}

function mostrarLamparasFirebase(){
    dbRefLamparas.on("value", function(snap){
        var datos = snap.val();
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
    });
}

function switchEstadoLampara(){
    var keyLamparaUpdate = this.getAttribute("key-lampara");
    var estadoLamparaUpdate = this.getAttribute("estado");
    var dbRefLamparaUpdate = dbRefLamparas.child(keyLamparaUpdate);
    if( estadoLamparaUpdate == "bulboff"){
        dbRefLamparaUpdate.update(
        {
            "estado": "bulbon"
        }
    );        
    }
    else{
        dbRefLamparaUpdate.update(
        {
            "estado": "bulboff"
        }
    );        
    }
}

function agregarLamparaFirebase(){
    if(elementos.length < 5)
    {
        dbRefLamparas.push(
            {
                "estado": "bulboff"
            }
        );
        eliminarLampara.disabled=  false;
    }
    else
    {
        agregarLampara.disabled = true;
    }
}

function eliminarLamparaFirebase(){    
    if(elementos.length > 1){
        var keyLamparaEliminar = elementos[elementos.length -1].getAttribute("key-lampara");
        var dbRefLamparaEliminar = dbRefLamparas.child(keyLamparaEliminar);
        dbRefLamparaEliminar.remove();
        agregarLampara.disabled = false;
    }
    else{
        eliminarLampara.disabled=  true;
    }
}