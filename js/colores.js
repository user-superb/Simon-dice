const $iniciar = document.querySelector('#iniciar');

const $color1 = document.querySelector('#color1');
const $color2 = document.querySelector('#color2');
const $color3 = document.querySelector('#color3');
const $color4 = document.querySelector('#color4');

const $estado = document.querySelector('#estado');

class Color {
    constructor(elemento, posicion){
        this.elemento = elemento;
        this.posicion = posicion;
    }
};

const color1 = new Color($color1, 0);
const color2 = new Color($color2, 1);
const color3 = new Color($color3, 2);
const color4 = new Color($color4, 3);

const colores = [color1, color2, color3, color4];
