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
    let ordenOriginal = [];
    let orden;

    let puedeClickear = true;

    let movimientoActual = 0;

    const velocidad = 500;
    const velocidad_delay = 500;
    const velocidad_click = 100;

    function generarNumero(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    function jugadorPierde(){
        $estado.textContent = 'Perdiste! Haz click para comenzar de nuevo'
        $iniciar.removeAttribute('disabled');

        movimientoActual = 0;

        ordenOriginal = [];
    };

    function prender(color, velocidad){
        return new Promise((resolve) => {
            color.classList.remove('apagar');
            setTimeout(() => {
                color.classList.add('apagar');
                resolve();
            }, velocidad);
        });
    };

    function delay(duracion){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, duracion);
        });
    };

    async function prenderColores(colores, orden){
        $estado.textContent = '...';
        puedeClickear = false;
        while (orden.length > 0){
            await delay(velocidad_delay);
            await prender(colores[orden[0]].elem, velocidad);
            orden.shift();
        }
        puedeClickear = true;
        $estado.textContent = 'Tu turno!';
        console.log(`Movimientos: ${ordenOriginal.length}`)
    };

    // Asignar onclick a los colores
    colores.forEach(color => {
        color.elem.onclick = () => {
            if (puedeClickear){
                prender(color.elem, velocidad_click); 
                if (color.pos == ordenOriginal[movimientoActual]){
                    movimientoActual++;
                } else if (color.pos !== ordenOriginal[movimientoActual]){
                    jugadorPierde();
                    return;
                };
                if (movimientoActual == ordenOriginal.length) {
                    console.log('bien papu');

                    movimientoActual = 0;

                    ordenOriginal.push(generarNumero(0,3));
                    orden = ordenOriginal.slice();
                    prenderColores(colores, orden);
                };
            };
        };
    });

    $iniciar.onclick = (event) => {
        $iniciar.setAttribute('disabled','');

        puedeClickear = false;
        movimientoActual = 0;

        ordenOriginal.push(generarNumero(0,3));
        orden = ordenOriginal.slice();
        prenderColores(colores, orden);

        event.preventDefault();
    };