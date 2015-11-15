/*
 * Blue-dot library
 * http://github.com/fpicalausa/blue-dot
 *
 * Copyright (c) 2015 Francois Picalausa
 * Licensed under the MIT licenses.
 */
(function() {
  'use strict';

  var geolocation_options = {
    enableHighAccuracy: false,
    timeout: 8000,
    maximumAge: 3000
  };

  function LocationError(code, reason) {
    var self = this;
    self.code = code;
    self.reason = reason instanceof Error ? reason : null;
    self.message = reason instanceof Error ? reason.message : reason;
    self.stack = (new Error()).stack;
  }
  LocationError.prototype = Object.create(Error.prototype);
  LocationError.prototype.constructor = LocationError;

  window.BlueDot = function(map, options) {
    var self = this;

    options = options || {};
    options.icon = options.icon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAQlBMVEVMaXFCiv9Civ9Civ9Civ9Civ9Civ9Civ9Civ+Kt/9+r/9Pkv90qf9hnf9Civ9wpv9Ee/+Jtf9Gjf9/sP9Kj/9KXf+JdfukAAAACXRSTlMAGCD7088IcsuTBctUAAAAYUlEQVR4XlWOWQrAIBBDx302d73/VSu0UMxfQsgLAMSEzmGKcGRCkZylBHPyMJQmk44QIRWdVCuxlgQoRNLaoi4ILs/a9m6VszuGf4PSaX21eyD6oZ256/AHa/0L9RauOw+4XAWqGLX26QAAAABJRU5ErkJggg=='
    options.on = options.on || {};
    options.on.geolocationError = options.on.geolocationError || function(error) {};
    options.on.firstGeolocationUpdate = options.on.firestgeolocationUpdate || function(newLocation) {};
    options.on.geolocationUpdate = options.on.geolocationUpdate || function(newLocation) {};

    self.options = options;

    self.marker = null;

    self.updateLocation = function(pos) {
      var coordinates = pos.coords;
      var position = {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      };

      if (self.marker === null) {
        self.marker = new google.maps.Marker({
          map: map,
          position: position,
          icon: options.icon
        });

        map.setCenter(position);
        options.on.firstGeolocationUpdate(pos);
      }
      else {
        self.marker.setPosition(position);
        options.on.geolocationUpdate(pos);
      }
    };

    self.error = function(error) {
      options.on.geolocationError(new LocationError(error.code, error));
    };

    if (!navigator.geolocation) {
      options.on.geolocationError(new LocationError(101, 'Geolocation is not supported on this browser'));
    }
    else {
      navigator.geolocation.watchPosition(self.updateLocation, self.error, geolocation_options);
    }
  };
})();
