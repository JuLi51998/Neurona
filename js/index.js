'use strict'
//VOCABULARIO
var positivas = ['aceptar', 'gracias','compasion',
'tolerancia', 'puedo','vamos','posible',"amor",'feliz','util','aprecio','si',]
var negativas = ['pereza','no','aburre','triste','enojo','preocupado',',imposible',
'odio','aburrido','culpa','feo','inutil','malo','']
var neutras = [];

//VARIALBLES
var palabra;
var contador = 0;
var salida_obtenida = 0;
var salida_esperada = [-1,0,1];

var peso1 = 1;
var peso2 = 1;
var peso3 = 1;
var peso4 = 1;

var pesosSinapticos = [peso1, peso2, peso3, peso4];

function principal() {
    palabra = document.getElementById('palabra').value;
    palabra = palabra.split(' ');

    palabra.forEach(element => {
        positivas.forEach(pos => {
            if(element == pos){
                palabra.splice(palabra.indexOf(element),1,1);
            }
        });
    });

    palabra.forEach(element => {
        negativas.forEach(pos => {
            if(element == pos){
                palabra.splice(palabra.indexOf(element),1,-1);
            }
        });
    });
    
    palabra.forEach(element => {
        if(element != 1 && element != -1) {
            palabra.splice(palabra.indexOf(element),1,0);
        }
    });

    let suma = (palabra[0]*pesosSinapticos[0])+(palabra[1]*pesosSinapticos[1])+(palabra[2]*pesosSinapticos[2])+(palabra[3]*pesosSinapticos[3]);
    console.log(suma);

    activacion(suma);

}

function activacion(valor){
    if(valor == 0){
        salida_esperada = 0;
    } else if(valor < 0){
        salida_esperada = -1;
    } else if(valor > 0){
        salida_esperada = 1;
    }
    error(salida_esperada, valor);
}

function error(salida, valor) {
    aprendizaje = salida - valor;

    if(no_aprendio) {
        pesoSinaptico()
    }
}

function pesoSinaptico() {
    nuevo_valor = tasa_aprendizaje * error * entrada

    iteracion()
}

function iteracion() {

}