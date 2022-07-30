    const $iniciar = document.querySelector('#iniciar');
    const $estado = document.querySelector('#estado');

    const $color1 = document.querySelector('#color1');
    const $color2 = document.querySelector('#color2');
    const $color3 = document.querySelector('#color3');
    const $color4 = document.querySelector('#color4');

    const color1 = new Color($color1, 0);
    const color2 = new Color($color2, 1);
    const color3 = new Color($color3, 2);
    const color4 = new Color($color4, 3);

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

    function perder(){
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

    function retrasar(duracion){
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
            await retrasar(velocidadRetraso);
            await prender(colores[orden[0]].elemento, velocidad);
            orden.shift();
        }
        puedeClickear = true;
        $estado.textContent = 'Tu turno!';
    };

    colores.forEach(color => {
        color.elemento.onclick = (event) => {
            if (puedeClickear){
                prender(color.elemento, velocidadClick); 
                if (color.posicion == ordenOriginal[movimientoActual]){
                    movimientoActual++;
                } else if (color.posicion !== ordenOriginal[movimientoActual]){
                    perder();
                    return;
                };
                if (movimientoActual == ordenOriginal.length) {
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
