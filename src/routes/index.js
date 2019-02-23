// Controllers
const sysController = require('../controllers/sysController')
const sslController = require('../controllers/sslController')


const routes = [
  {
    method: 'GET',
    url: '/api/v1/ssl-validity/:site',
    handler: sslController.getValidity,
    schema: {
      description: 'Check domains SSL certificate validity',
      tags: ['Tools'],
      params: {
        type: 'object',
        properties: {
          site: {
            type: 'string',
            description: 'domain name to check'
          }
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
					  days_remaining: { type: 'integer'},
					  valid:					{ type: 'boolean'},
					  valid_from:			{ type: 'string', format: 'date-time' },
					  valid_to:				{ type: 'string', format: 'date-time' }
					}
        },
        400: {
          description: 'Bad request',
          type: 'object',
          properties: {
            error: {
              type: 'object',
                properties: {
                  address: { type: 'string' },
                  code:    { type: 'string' },
                  errno:   { type: 'string' },
                  port:    { type: 'number' },
                  syscall: { type: 'string' }
                }
            }
          }
        }
      }
    }
  },
  {
    method: 'GET',
    url: '/api/v1/system-info',
    handler: sysController.getInfo,
    schema: {
      description: 'Show system info',
      tags: ['System'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            external:   { type: 'number' },
            heapTotal:  { type: 'number' }, 
            heapUsed:   { type: 'number' },
            rss:        { type: 'number' }
          }
        }
      }
    }
  },

]

module.exports = routes
