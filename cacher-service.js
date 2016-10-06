/**
 * @module cacherModule/cacher
 * @description ## *factory: cacher* <br>
 * Serie de utilidades para cachear datos en memoria
 */

(function () {
  'use strict';

  angular.module('cacherModule').factory('cacher', cacher);

  cacher.$inject = ['$localStorage'];

  function cacher($localStorage) {
    /**
     * @const MILISECONDS_DEFAULT
     * @description Define el numero de milisegundos por defecto que se guardan
     * los datos, por defecto 24 horas.
     * @type {number}
     */
    var MILISECONDS_DEFAULT = 1000 * 60 * 60 * 24;

    var result = {
      set    : set,
      get    : get,
      clean  : clean,
      objects: {}
    };

    init();
    /**
     * Inicia el objeto cacher, sirve para el caso de que se recargue la
     * pagina y haya información en el localstorage guardada
     */
    function init() {
      let datos = $localStorage.cacher;
      if (datos !== void(0)) {
        for (let i in datos) {
          if (datos.hasOwnProperty(i)) {
            console.log(i);
            result.objects[i] = nuevoObjeto(i, datos[i].data, datos[i].mil, datos[i].date);
          }
        }
      } else {
        $localStorage.cacher = {};
      }
    }


    function nuevoObjeto(nombre, data, storage, mil) {
      storage = storage || false;
      if (mil === void(0)) {
        // si no se establece milisegundos se pone por defecto un día
        mil = MILISECONDS_DEFAULT;
      }
      return {
        data   : function () {
          if (storage) {
            $localStorage.cacher[nombre] = {
              data: data,
              mil : mil,
              date: Date.parse(new Date()) + mil
            };
            return function () {
              return $localStorage.cacher[nombre].data;
            };
          } else {
            return function () {
              return data;
            };
          }
        }(),
        mil    : mil,
        date   : Date.parse(new Date()) + mil,
        storage: storage
      };
    }

    /**
     * Setea el dato que le pasemos en la cache
     * @function set
     * @param {String} nombre nombre del dato a cachear
     * @param {*} data datos del objeto a cachear
     * @param {Boolean} [storage=false] Indica si se debe guardar el dato en el localStorage o no
     * @param {Number} [mil=MILISECONDS_DEFAULT] milisegundos que se mantendrá el dato en memoria
     * @instance
     */
    function set(nombre, data, storage, mil) {
      result.objects[nombre] = nuevoObjeto(nombre, data, storage, mil);
    }

    /**
     * Obtiene el dato previamente cacheado
     * @function get
     * @param {String} nombre Nombre del dato a recuperar de la cache
     * @returns {(*|null)} Devuelve null si no encuentra el dato que estamos
     * buscando, ya sea porque no existe o porque ha caducado.
     * @instance
     */
    function get(nombre) {
      if (nombre === void(0)) {
        return getAll();
      } else {
        return getByName(nombre);
      }
    }

    function getByName(nombre) {
      var datoCacheado = null;
      if (result.objects[nombre] !== void(0)) {
        var time = result.objects[nombre].date - Date.parse(new Date());
        if (time > 0) {
          datoCacheado = result.objects[nombre].data();
        } else {
          delete result.objects[nombre];
        }
      }
      return datoCacheado;
    }

    function getAll() {
      return result.objects;
    }

    /**
     * @description Borra la cache completa o el dato concreto si se indica como
     * parametro
     * @function clean
     * @param {String} [nombre] Si se indica borrará solo el dato concreto
     * previamente cacheado
     * @instance
     */
    function clean(nombre) {
      if (nombre !== void(0)) {
        if (result.objects[nombre].storage) delete $localStorage.cacher[nombre];
        delete result.objects[nombre];
      } else {
        Object.keys(result.objects).forEach(function (item, index) {
          if (result.objects[item].storage) delete $localStorage.cacher[item];
        });
        result.objects = {};
      }
    }

    return result;
  }
})();
