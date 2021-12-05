// const User = require('./user.model');
// const usersService = require('./user.service');
const { v4: uuidv4 } = require('uuid');

let users = [];

const getUsers = (req, reply) => {
  reply.send(users);
};

const getUser = (req, reply) => {
  const { id } = req.params;

  const user = users.find((record) => record.id === id);

  reply.send(user);
};

const addUser = (req, reply) => {
  const { name, login, password } = req.body;
  const user = {
    id: uuidv4(),
    name,
    login,
    password
  };

  users = [...users, user];

  reply.code(201).send(user);
};

const deleteUser = (req, reply) => {
  const { id } = req.params;

  users = users.filter((item) => item.id !== id);

  reply.send({ message: `Item ${id} has been removed` });
};

const updateUser = (req, reply) => {
  const { id } = req.params;
  const { name, login, password } = req.body;

  const index = users.findIndex(record => record.id === id);
  if (index === -1) {
    reply.code(404).send({ message: 'Not found' });
    return;
  }

  const updatedUser = { id, name, login, password: password || password };
  users[index] = updatedUser;

  reply.send(updatedUser);
};

// Item schema
const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' }
  },
};

// Options for get all items
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  handler: getUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: User,
    },
  },
  handler: addUser,
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUser,
};

const updateUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

function router(fastify, options, done) {
  fastify.get('/users', getUsersOpts);
  fastify.get('/users/:id', getUserOpts);
  fastify.post('/users', postUserOpts);
  fastify.delete('/users/:id', deleteUserOpts);
  fastify.put('/users/:id', updateUserOpts);
  done();
}

module.exports = router;
