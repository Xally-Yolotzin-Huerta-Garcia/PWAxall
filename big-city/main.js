//configuracion del sw

alert('hola')
if('serviceWorker'in navigator){
    navigator.serviceWorker
    .register('sw.js')
    .then(function(registration){
        //si el service worker se ha registrado exitosamente
        console.log('Service worker registrado con exito:',registration);

    })
    .catch(function(error){
        //error al regsitrar el service worker 
        console.error('error al registrar el service worker: ',error );
    });

}else{
    console.error('error no soporta el service worker:');
}