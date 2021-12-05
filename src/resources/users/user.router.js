const User = require('./user.model');
const usersService = require('./user.service');

const getUsers = (req, reply) => {
  reply.send(usersService.getAll());
};

const getUser = (req, reply) => {
  const { id } = req.params;

  const user = usersService.getById(id)

  reply.send(user);
};

const addUser = (req, reply) => {
  const user = usersService.create(new User(req.body))

  reply.code(201).send(User.toResponse(user));
};

const deleteUser = (req, reply) => {
  const { id } = req.params;

  usersService.remove(id)

  reply.send({ message: `Item ${id} has been removed` });
};

const updateUser = (req, reply) => {
  const { id } = req.params;

  const record = usersService.getById(id)

  if (!record) {
    reply.code(404).send({ message: 'Not found' });
    return;
  }
  const updatedUser = new User({id, ...req.body})

  usersService.update(id, updatedUser)

  reply.send(updatedUser);
};

// Item schema
const UserSchema = {
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
        items: UserSchema,
      },
    },
  },
  handler: getUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: UserSchema,
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
      201: UserSchema,
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
      200: UserSchema,
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
