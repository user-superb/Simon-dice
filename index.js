    const $iniciar = document.querySelector('#iniciar');
    const $estado = document.querySelector('#estado');
    const $puntos = document.querySelector('#puntos');
    const $record = document.querySelector('#record');

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

    const duracion = 500;
    const duracionRetraso = 500;
    const duracionClick = 100;

    let puntosActuales = 0;
    let puntosRecord = 0;

    function generarNumero(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    function actualizarPuntos(puntos){
        puntosActuales += puntos;
        $puntos.textContent = `Puntuacion actual: ${puntosActuales}`;
    };

    function verificarRecord(){
        if (puntosActuales > puntosRecord) {
            puntosRecord = puntosActuales;
            $record.textContent = `Record: ${puntosRecord}`;
        };
    };

    function perder(){
        $estado.textContent = 'Perdiste! Haz click para comenzar de nuevo'
        $iniciar.removeAttribute('disabled');

        verificarRecord();

        puntosActuales = 0;
        movimientoActual = 0;

        ordenOriginal = [];
    };

    function prender(color, duracion){
        return new Promise((resolve) => {
            color.classList.remove('apagar');
            setTimeout(() => {
                color.classList.add('apagar');
                resolve();
            }, duracion);
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
            await retrasar(duracionRetraso);
            await prender(colores[orden[0]].elemento, duracion);
            orden.shift();
        }
        puedeClickear = true;
        $estado.textContent = 'Tu turno!';
    };

    colores.forEach(color => {
        color.elemento.onclick = (event) => {
            if (puedeClickear){
                prender(color.elemento, duracionClick); 
                if (color.posicion == ordenOriginal[movimientoActual]){
                    movimientoActual++;
                } else if (color.posicion !== ordenOriginal[movimientoActual]){
                    perder();
                    return;
                };
                if (movimientoActual == ordenOriginal.length) {
                    actualizarPuntos(movimientoActual);
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

        actualizarPuntos(0);

        ordenOriginal.push(generarNumero(0,3));
        orden = ordenOriginal.slice();
        prenderColores(colores, orden);
    };
