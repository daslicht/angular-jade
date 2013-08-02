'use strict';

angular.module('sails.socket-io', []).
factory('socket', function($rootScope, $timeout) 
{
  var socket = io.connect();

  function request(url, data, cb, method) {

    var usage = 'Usage:\n socket.' +
      (method || 'request') +
      '( destinationURL, dataToSend, fnToCallWhenComplete )';

    // Remove trailing slashes and spaces
    url = url.replace(/^(.+)\/*\s*$/, '$1');

    // If method is undefined, use 'get'
    method = method || 'get';


    if (typeof url !== 'string') {
      throw new Error('Invalid or missing URL!\n' + usage);
    }

    // Allow data arg to be optional
    if (typeof data === 'function') {
      cb = data;
      data = {};
    }

    // Build to request
    var json = JSON.stringify({
      url: url,
      data: data
    });

    console.log('json',json);

    // Send the message over the socket
    socket.emit(method, json, function afterEmitted(result) {

      var parsedResult = result;
      try {
        parsedResult = JSON.parse(result);
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.warn("Could not parse:", result, e);
        }
        throw new Error("Server response could not be parsed!\n" + result);
      }

      // TODO: Handle errors more effectively
      if (parsedResult === 404) throw new Error("404: Not found");
      if (parsedResult === 403) throw new Error("403: Forbidden");
      if (parsedResult === 500) throw new Error("500: Server error");

      cb && cb(parsedResult);

    });
  }

  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $timeout(function() {
          callback.apply(socket, args);
        }, 0);
      });
    },
    
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    },

    post: function(url, data, cb) {
      return request(url, data, cb, 'post');
    },
    get: function(url, data, cb) {
      return request(url, data, cb, 'get');
    },
    put: function(url, data, cb) {
      return request(url, data, cb, 'put');
    },
    delete: function(url, data, cb) {
      return request(url, data, cb, 'delete');
    },




  };
});