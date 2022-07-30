const $iniciar = document.querySelector('#iniciar');

const $color1 = document.querySelector('#color1');
const $color2 = document.querySelector('#color2');
const $color3 = document.querySelector('#color3');
const $color4 = document.querySelector('#color4');

const $estado = document.querySelector('#estado');

class color {
    constructor(elem, pos){
        this.elem = elem;
        this.pos = pos;
    }
};

const color1 = new color($color1, 0);
const color2 = new color($color2, 1);
const color3 = new color($color3, 2);
const color4 = new color($color4, 3);

const colores = [color1, color2, color3, color4];