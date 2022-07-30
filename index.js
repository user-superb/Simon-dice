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
            await retrasar(velocidad_delay);
            await prender(colores[orden[0]].elem, velocidad);
            orden.shift();
        }
        puedeClickear = true;
        $estado.textContent = 'Tu turno!';
    };

    // Asignar onclick a los colores
    colores.forEach(color => {
        color.elem.onclick = () => {
            if (puedeClickear){
                prender(color.elem, velocidad_click); 
                if (color.pos == ordenOriginal[movimientoActual]){
                    movimientoActual++;
                } else if (color.pos !== ordenOriginal[movimientoActual]){
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
