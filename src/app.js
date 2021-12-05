const fastify = require('fastify')({ logger: true });

//
// fastify.register(require('fastify-swagger'), {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'fastify-api' },
//   },
// })


fastify.register(require('./resources/users/user.router'))

// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/users', userRouter);

module.exports = fastify;
