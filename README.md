# humblebundle

A simple nodejs API for reading your Humble Bundle purchases.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


## usage

Install with `npm install humblebundle`.

Here is an example of getting some info:

```js
var humblebundle = require('humblebundle')

humblebundle.login(email, password)
  .then(function(){
    // get list of orders
    return humblebundle.order()
  })
  .then(function(orders){
    // get a single order by ID
    return humblebundle.order(orders[0])
  })
  .then(function(order){
    console.log(order)
  })
  .catch(function(err){
    throw err
  })

```

### tests

Run them tests with `npm test`. You will need to set these environment variables:

```
HUMBLE_EMAIL
HUMBLE_PASSWORD
```

## api

All of these return promises.


### `login(email, password)`

Authenticate yourslf with Humble Bundle. Used to get the cookies used in other API calls. 


### `order([id])`

If you leave out `id`, you'll get a list of your orders. If you include it, you'll get details about the order.


### `claimed()`

Get list of all the claimed entities for a user. This takes a really long time (45 seconds on my connection.)

