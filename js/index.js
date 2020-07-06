'use strict'
//VOCABULARIO
var positivas = ['aceptar', 'gracias','compasion',
'tolerancia', 'puedo','vamos','posible','amor','feliz','util','aprecio','si','vida']
var negativas = ['pereza','no','aburre','triste','enojo','preocupado',',imposible',
'odio','aburrido','culpa','feo','inutil','malo','']
var neutras = [];

//VARIALBLES
var palabra;
var palabra_numerico;

var contador = 0;
var salida_obtenida = 0;
var salida_esperada = [1,0,-1];
var tasa_aprendizaje = 1;
var a = 0,b = 0,c = 0;

//PESOS
var peso1 = 5;
var peso2 = 2;
var peso3 = 1;
var peso4 = -1;
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

    palabra_numerico = palabra;
    
    let suma = (palabra[0]*pesosSinapticos[0])+(palabra[1]*pesosSinapticos[1])+(palabra[2]*pesosSinapticos[2])+(palabra[3]*pesosSinapticos[3]);
    
    for (let i = 0; i < palabra.length; i++) {
        if(palabra[i] > 0) {
            a++;
        } else if(palabra[i] < 0) {
            c++;
        }
        
    }

    activacion(suma);

}

function activacion(valor){
    if(valor <= 0){
        salida_obtenida = -1;
    } else if(valor > 0){
        salida_obtenida = 1;
    }
    error(salida_obtenida);
}

function error(valor) {
    debugger
    let count = 0;
    if(a >= b && a > c){
        count = 0;
    }else if(c > b && c > a){
        count = 2;
    } else {
        count = 2;
    }
    var aprendizaje = salida_esperada[count] - valor;

    if(aprendizaje != 0) {
        pesoSinaptico(aprendizaje, palabra)
    } else {
        
        if(a >= b && a > c){
            console.log('Es veridica!');
        }else{
            console.log('No es veridica!')
        }
    }
}

function pesoSinaptico(aprendizaje, entrada) {
    var variacion = 0;
    for(let i = 0; i < 4; i++) {
        variacion = tasa_aprendizaje * aprendizaje * entrada[i];
        pesosSinapticos[i] = pesosSinapticos[i] + variacion;
    }
    console.log(pesosSinapticos)

    principal();
}