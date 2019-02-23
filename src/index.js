'use strict'

// Cluster
var cluster = require('cluster')

if (cluster.isMaster) {
    // CPU count
    let cpuCount = require('os').cpus().length

    // Create 2 workers for each CPU
    for (let i = 0; i < cpuCount / 2; i += 1) {
        cluster.fork()
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id)
        cluster.fork()
    });
}

// Worker
else {

  // Configurable parameters
  // Application port
  const PORT = process.env.PORT || 8080
 
  const app = require('fastify')({
    logger: false
  })
  // Import Swagger Options
  const swagger = require('./config/swagger')
  // Register Swagger
  app.register(require('fastify-swagger'), swagger.options)

  const routes = require('./routes')
  routes.forEach((route, index) => {
    app.route(route)
  })

  app.listen(PORT, () => {
      console.info(`Worker ${cluster.worker.id} is listening on port ${PORT}`)
  })
  
  app.ready(err => {
    if (err) throw err
    app.swagger()
  })

}
