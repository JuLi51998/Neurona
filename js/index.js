'use strict'

//VOCABULARIO
var positivas = ['aceptar', 'gracias','compasion',
'tolerancia', 'puedo','vamos','posible','amor','feliz','util','aprecio','si','vida']
var negativas = ['pereza','no','aburre','triste','enojo','preocupado',',imposible',
'odio','aburrido','culpa','feo','inutil','malo']
var neutras = [];

//VARIALBLES
var palabra;
var palabra_numerico;

var contador = 0;
var salida_obtenida = 0;
var salida_esperada = [1,0,-1];
var tasa_aprendizaje = 1;
var a = 0,b = 0,c = 0;

var iteraciones = 0;
var var_suma = 0;
var suma = 0;
var estado = '';

//PRINTS
var printPesos = [];
var printPesosIniciales = [];
var printPalabra = '';

//PESOS
var pesosSinapticos = [];



function principal() {
    palabra = document.getElementById('palabra').value;
    printPalabra = palabra;
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
    

    if (iteraciones == 0) {
        for(let i = 0; i < palabra.length; i++) {
            let valorPeso = Math.floor(Math.random() * (200 - -200)) + -200  
            pesosSinapticos[i] = valorPeso;
            printPesos.push(valorPeso);
            printPesosIniciales = printPesos;
        }
    }

    for(let i =0; i < palabra.length; i++) {
        var_suma = (palabra[i]*pesosSinapticos[i]);
        suma += var_suma
    }
    
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
        if(a > c){
            estado = 'Publicada';
            print();
            publicar();
        }else{
            estado = 'No publicada'
            print();
        }
    }
}

function pesoSinaptico(aprendizaje, entrada) {
    var variacion = 0;
    printPesos = [];
    for(let i = 0; i < palabra_numerico.length; i++) {
        variacion = tasa_aprendizaje * aprendizaje * entrada[i];
        pesosSinapticos[i] = pesosSinapticos[i] + variacion;
        printPesos.push(pesosSinapticos[i]);
    }
    iteraciones += 1;
    suma = 0;
    console.log(pesosSinapticos)

    principal();
    
}

function print() {
    var iteracion = document.getElementById('iteracion');
    var pesos = document.getElementById('pesos')
    var pesosIniciales = document.getElementById('pesosIniciales')
    var estadoFinal = document.getElementById('estadoFinal')
    var publicacion = document.getElementById('publicacion')

    publicacion.innerHTML = printPalabra;
    estadoFinal.innerHTML = estado;
    pesosIniciales.innerHTML = "[" + printPesosIniciales + "]";    
    pesos.innerHTML = "[" + printPesos + "]";
    iteracion.innerHTML = iteraciones;
}

function publicar() {
    var guardado = localStorage.getItem('datos');
    var ObjetoObtenido = JSON.parse(guardado);
    ObjetoObtenido = Object.values(ObjetoObtenido);
    ObjetoObtenido.push(printPalabra);
    // Guardo el objeto como un string
    localStorage.setItem('datos', JSON.stringify(ObjetoObtenido));
}

function publicaciones() {
    var guardado = localStorage.getItem('datos');
    var arrayGuardado = JSON.parse(guardado);
 
    arrayGuardado.forEach(element => {
        $("<div>", {
            'class': 'card'
        }).append(
            $('<h5>', {
                'class': 'card-header',
                'text': 'Positivo'
            }),
            $('<div>', {
                'class': 'card-body',
            }).append(
                $('<p>', {
                    'class': 'card-text',
                    'id': 'frasePublicada',
                    'text': element
                })
              )
        ).appendTo('#otraDiv').fadeIn('slow');
    });
    
}
