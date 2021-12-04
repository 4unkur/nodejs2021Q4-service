const fastify = require('fastify')({ logger: true });
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

fastify.get('/', (req, reply) => {
  reply.send('Service is running!');
});

// app.use('/users', userRouter);

module.exports = fastify;
