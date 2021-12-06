const fastify = require('fastify')({ logger: true });

// fastify.register(require('fastify-swagger'), {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'fastify-api' },
//   },
// })

fastify.register(require('./resources/users/user.router'))
fastify.register(require('./resources/boards/board.router'))
fastify.register(require('./resources/tasks/task.router'))

module.exports = fastify;
