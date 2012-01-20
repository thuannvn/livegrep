"use strict";
var Codesearch = function() {
  return {
    socket: null,
    delegate: null,
    connect: function(delegate) {
      if (Codesearch.socket !== null)
        return;
      console.log("Connecting...");
      Codesearch.remote = null;
      Codesearch.delegate = delegate;
      var socket = io.connect();
      socket.on('connect', function () {
                  Codesearch.socket = socket;
                  if (Codesearch.delegate.on_connect)
                    Codesearch.delegate.on_connect();
                });
      socket.on('error', Codesearch.delegate.error);
      socket.on('match', Codesearch.delegate.match);
      socket.on('search_done', Codesearch.delegate.search_done);
    },
    new_search: function(re) {
      if (Codesearch.socket !== null)
        Codesearch.socket.emit('new_search', re);
    }
  };
}();
