exports.options = {
  routePrefix: '/',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Health Check Tools API',
      description: 'Different tools for checking services health',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://github.com/zpotoloom/health-check-tools.git',
      description: 'Find more info here'
    },
    consumes: ['application/json'],
    produces: ['application/json']
  }
}
