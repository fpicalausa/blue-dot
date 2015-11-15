# Blue-Dot

Display geolocation information on google map as a blue dot.

Bluedot uses the [HTML 5 geolocation API][geolocation-api] to retrieve
the current location, and displays it as a [Marker][googlemap-markers] on [Google Maps][googlemaps-api].

# Usage

To display a blue dot that tracks the user geolocation, you can call blue-dot as
follows:

```JavaScript
new BlueDot(map);
```

You can customize the look and feel of the blue dot, and intercept events
by using the options parameter:

```JavaScript
var options = {
    icon: '/assets/images/my-blue-dot.png',
    on: {
        geolocationError: function(error) { alert(error.message); },
        firstGeolocationUpdate: function(loc) { alert("Found where you are!"); }
        geolocationUpdate: function(loc) { alert("You just moved, didn't you?"); }
    }
}

new BlueDot(map, options);
```

# Reference

## BlueDot object

* `new BlueDot(map, options);` (Constructor)
  Parameters:
  * map: A [Google Maps Map object][googlemaps-map]
  * options: A BlueDot options hash

## BlueDot options hash

* icon: The icon to use when creating the [Google Maps Marker][googlemaps-markers]. Defaults to a blue dot as a Data URL.
* on: A hash of events handlers
  * geolocationError: a callback function that takes a LocationError object 
    as an input parameter. This function is called if the browser is unable 
    to handle geolocation, or when [watchPosition][geolocation-watchposition] 
    returns an error.
  * firstGeolocationUpdate: a callback function that takes a
    [Position][geolocation-position] object as an input parameter. This function
    is triggered only on the first geolocation update, after the map is centered
    on the blue dot.
  * geolocationUpdate: a callback function that takes a
    [Position][geolocation-position] object as an input parameter. This function
    is triggered after geolocation updates (except the first one), after the blue dot location has been updated.

## LocationError object

LocationError inherits prototypically from Error.

* code (property)
  An integer value describing the error. The following values are assigned
  * 0-100: Identical to codes from [PositionError][geolocation-positionerror]
  * 101: The navigator does not support geolocation
* message (property)
  A string describing the error.
* reason (property)
  The underlying [PositionError][geolocation-positionerror] if present.

[geolocation-api]: http://dev.w3.org/geo/api/spec-source.html
[geolocation-watchposition]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
[geolocation-position]:https://developer.mozilla.org/en-US/docs/Web/API/Position
[geolocation-positionerror]:https://developer.mozilla.org/en-US/docs/Web/API/PositionError
[googlemaps-api]: https://developers.google.com/maps/
[googlemaps-markers]: https://developers.google.com/maps/documentation/javascript/markers
[googlemaps-map]: https://developers.google.com/maps/documentation/javascript/reference#Map
