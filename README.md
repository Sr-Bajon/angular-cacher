#CACHER

Permite guardar datos en memoria y localStorage.

##API

__cacher.set(__ nombre, data, storage, mil __)__
Guarda el dato en memoria o en el localStorage.
Los datos guardados en localStorage se recuperan aunque se recargue la pagina.

__nombre__  : Nombre que le damos al dato
__data__    : datos a guardar
__storage__ : Boolean, opcional. True para guardar en localStorage
__mil__     : caducidad en milisegundos, opcional, por defecto 1 día de cacheo.
 
__Ejemplos__:
<pre>cacher.set('saludo', 'hola');

cacher.set('saludo', {
  temprano: 'buenos dias', 
  tarde: 'buenas tardes'
});

// guardar en localStorage 
cacher.set('saludo', 'hola', true);

// guardar durante 1 minuto
cacher.set('saludo', 'hola', false, 1000*60);
</pre>

__cacher.get(__ nombre __)__
Obtiene el dato guardado si existe y no ha caducado.

__nombre__  : Opcional, nombre que le damos al dato

__Ejemplos__:
<pre>// obtenemos todos los datos guardados
cacher.get();

// obtiene el dato saludo, null si no existe o ha caducado
cacher.get('saludo');
</pre>

__cacher.clean(__ nombre __)__
Borra todos los datos o el dato concreto que le pasemos como argumento

__nombre__  : Opcional, dato que queremos borrar

__Ejemplos__:
<pre>cacher.clean('saludo');

// borramos todos los datos guardados
cacher.clean();
