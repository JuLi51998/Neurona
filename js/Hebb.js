'use strict'

//ESTADOS
var estados = ['conectado', 'desconectado'];

//VARIALBLES
var palabra;
var palabra_numerico;

var contador = 0;
var salida_obtenida = 0;
var salida_esperada = 0;
var tasa_aprendizaje = -0.5;

//PESOS
var peso1 = 0.5;
var peso2 = 0.5;
var pesosSinapticos = [peso1, peso2];

function principal() {
    palabra = document.getElementById('palabra').value;
    palabra = palabra.split(' ');

    palabra.forEach(element => {
        if(element == estados[0]){
            palabra.splice(palabra.indexOf(element),1,1);
        } else {
            palabra.splice(palabra.indexOf(element),1,-1);
        }
    });

    palabra_numerico = palabra;
    
    let suma = (palabra[0]*pesosSinapticos[0])+(palabra[1]*pesosSinapticos[1]);

    activacion(suma);

}

function activacion(valor){
    if(valor >= 1){
        salida_obtenida = 1;
    } else {
        salida_obtenida = -1;
    }

    var suma = palabra_numerico[0] + palabra_numerico[1];
    if(suma > 1){
        salida_esperada = 1;
    } else {
        salida_esperada = -1;
    }

    if(salida_obtenida == salida_esperada){
        if(suma > 1) {
            console.log('Estan conectados!');
        } else {
            console.log('Estan desconectados!');
        }
    } else {
        hebb(salida_obtenida);
    }

}


function hebb(valor) {
    var variacion = 0;
    if(tasa_aprendizaje > 0  && valor < 0) {
        tasa_aprendizaje = tasa_aprendizaje * -1;
    }
    for(let i = 0; i < 2; i++) {
        variacion = tasa_aprendizaje * valor * palabra_numerico[i];
        pesosSinapticos[i] = pesosSinapticos[i] + variacion;
    }
    console.log(pesosSinapticos);

    principal();
}
