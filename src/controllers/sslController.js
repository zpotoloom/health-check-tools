'use strict'

var sslChecker = require("ssl-checker")

var client = require('../redis')

function checkSSL (site, refresh, reply, resolve) {
  // Clear cache
  if ( refresh ) {
    console.info({cache: 'cleared'})
    client.del(site)
  }
  client.get(site, function (error, result) {
    if (error) {
      console.log(error)
      throw error
    }
    if ( result == null ) {
      sslChecker(site, 'GET', 443)
      .then(result => {
        client.set(site, JSON.stringify(result))
        reply.header('X-CACHE', 'MISS')
        console.info({cache: false})
        resolve(result)
      })
      .catch((err) => {
        reply.code(400)
        resolve({ error: err });
      })
    } else {
      console.info({cache: true})
      reply.header('X-CACHE', 'HIT')
      resolve(JSON.parse(result))
    }
  });
}

exports.getValidity = async (req, reply) => {
    var res = await new Promise(function (resolve) {
      if( req.query.refresh !== undefined ) {
        checkSSL(req.params.site, true, reply, resolve)
      } else {
        checkSSL(req.params.site, false, reply, resolve)
      }
    })
    return res
}
