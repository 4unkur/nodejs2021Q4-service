const Task = require('./task.model');
const taskService = require('./task.service');

const getTasks = (req, reply) => {
  const { boardId } = req.params;

  reply.send(taskService.getAll(boardId));
};

const getTask = (req, reply) => {
  const { taskId } = req.params;

  const task = taskService.getById(taskId);

  if (!task) {
    reply.code(404).send({ message: 'Not found' });
    return;
  }

  reply.send(task);
};

const addTask = (req, reply) => {
  const { boardId } = req.params;

  const task = taskService.create(new Task({ ...req.body, boardId }));

  reply.code(201).send(task);
};

const deleteTask = (req, reply) => {
  const { taskId } = req.params;

  taskService.remove(taskId);

  reply.send({ message: `Item ${taskId} has been removed` });
};

const updateTask = (req, reply) => {
  const { taskId } = req.params;

  const record = taskService.getById(taskId);

  if (!record) {
    reply.code(404).send({ message: 'Not found' });
    return;
  }
  const updatedTask = new Task({ ...req.body, taskId });

  taskService.update(taskId, updatedTask);

  reply.send(updatedTask);
};

// Item schema
const TaskSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    userId: { type: 'number', nullable: true },
    boardId: { type: 'string' },
    columnId: { type: 'number', nullable: true },
    order: { type: 'number' }
  },
};

// Options for get all items
const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: TaskSchema,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: TaskSchema,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'description', 'userId', 'boardId', 'columnId'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        userId: { type: 'number', nullable: true },
        boardId: { type: 'string' },
        columnId: { type: 'number', nullable: true },
        order: { type: 'number' }
      },
    },
    response: {
      201: TaskSchema,
    },
  },
  handler: addTask,
};

const deleteTaskOpts = {
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
  handler: deleteTask,
};

const updateTaskOpts = {
  schema: {
    response: {
      200: TaskSchema,
    },
  },
  handler: updateTask,
};

function router(fastify, options, done) {
  fastify.get('/boards/:boardId/tasks', getTasksOpts);
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);
  fastify.post('/boards/:boardId/tasks', postTaskOpts);
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);
  done();
}

module.exports = router;
