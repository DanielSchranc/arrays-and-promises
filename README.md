# arrays-and-promises
Just trying out some `Array.prototype` methods with `Promise API`.

Use cases being handled:
- user has assosiated some cars.
- based on car count user requested, display results.
- in case of user's owned cars count is greater or equal to count request, return just their cars array.
- in case of user's owned cars count is less than count request, return their cars supplemented by suggested cars popular by gender.
- in case of total of user's owned cars count supplemented by suggested cars for their gender is less than count request reject with custom error.
- in case of user doesn't own any car yet, just return suggested cars popular by gender.
