describe('Service: cacher', function () {
  'use strict';

  beforeAll(function () {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 200;
  });

  beforeEach(angular.mock.module('cacherModule'));

  var _cacher, _$localStorage;
  beforeEach(inject(function ($injector) {
    _cacher        = $injector.get('cacher');
    _$localStorage = $injector.get('$localStorage');
  }));

  afterEach(function () {
    // borra el cacheo en memoria y localStorage despuesd de cada test
    _cacher.clean();
  });

  it('Setea un dato simple en memoria', function () {
    _cacher.set('prueba', 'hola');
    expect(_cacher.get('prueba')).toEqual('hola');
  });

  it('Setea un objeto en memoria', function () {
    _cacher.set('prueba', {dato: 'hola'});
    expect(_cacher.get('prueba').dato).toEqual('hola');
  });

  it('Setea un dato en el localStorage', function () {
    _cacher.set('prueba', 'hola', true);
    expect(_$localStorage.cacher.prueba.data).toEqual('hola');
  });

  it('Setea un dato con tiempo de caducidad', function () {
    _cacher.set('prueba', 'hola', false, 1);

    setTimeout(function () {
      expect(_cacher.get('prueba')).toBeNull();
    }, 100);

  });

  it('Setea varios datos y los obtiene todos a la vez', function () {
    _cacher.set('prueba1', 'hola');
    _cacher.set('prueba2', 'adios');
    var datosCacheados = _cacher.get();
    expect(datosCacheados.prueba1.data()).toEqual('hola');
    expect(datosCacheados.prueba2.data()).toEqual('adios');
  });

  it('Se borra la cache en memoria', function () {
    _cacher.set('prueba1', 'hola');
    _cacher.clean();
    expect(_cacher.get('prueba')).toBeNull();
  });

  it('Se borra la cache del localStorage', function () {
    _cacher.set('prueba1', 'hola', true);
    _cacher.clean();
    expect(_cacher.get('prueba')).toBeNull();
  });

});
