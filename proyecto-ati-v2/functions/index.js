
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

//Init Firebase
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();

var dbRefLamparas = firebase.database().ref().child("lamparas");

//READ
app.get('/api/lamparas', function(request, response){ 
    dbRefLamparas.once('value', function(snap){
        var  lamparas = snap.val();   
        response.json(lamparas);
    });   
});

//CREATE
app.post('/api/lamparas', function(request, response){
    dbRefLamparas.push(
        {
            "estado": "bulboff"
        });
    response.end("HTTP POST funciono con exito");
});

//UPDATE
app.put('/api/lamparas/:id/:estado', function(request, response){
    var id = request.params.id;
    var estado = request.params.estado;
    dbRefLamparas.child(id).update(
        {
            "estado" : estado
        }
    );
    response.end("HTTP PUT funciono con exito");
});

//DELETE
app.delete('/api/lamparas/:id', function(request, response){
    var id = request.params.id;
    dbRefLamparas.child(id).remove();
    response.end("HTTP DELETE funciono con exito");
});

exports.api = functions.https.onRequest(app);
