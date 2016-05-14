# humblebundle

A simple nodejs API for reading your Humble Bundle purchases.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


## usage

Install with `npm install humblebundle`.

```js
var humblebundle = require('humblebundle')

// only needed once before calling other stuff to set cookies
humblebundle.login(mail, password)
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