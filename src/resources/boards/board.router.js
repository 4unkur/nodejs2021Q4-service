const Board = require('./board.model');
const boardService = require('./board.service');

const replyNotFound = (reply) => {
  reply.code(404).send({ message: 'Not found' });
};

const getBoards = (req, reply) => {
  reply.send(boardService.getAll());
};

const getBoard = (req, reply) => {
  const { id } = req.params;

  const board = boardService.getById(id);

  if (!board) {
    replyNotFound(reply);
    return;
  }

  reply.send(board);
};

const addBoard = (req, reply) => {
  const board = boardService.create(new Board(req.body));

  reply.code(201).send(board);
};

const deleteBoard = (req, reply) => {
  const { id } = req.params;

  const board = boardService.getById(id);

  if (!board) {
    replyNotFound(reply);
    return;
  }

  boardService.remove(id);

  reply.send({ message: `Item ${id} has been removed` });
};

const updateBoard = (req, reply) => {
  const { id } = req.params;

  const record = boardService.getById(id);

  if (!record) {
    replyNotFound(reply);
    return;
  }
  const updatedBoard = new Board({ id, ...req.body });

  boardService.update(id, updatedBoard);

  reply.send(updatedBoard);
};

const Column = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    order: { type: 'number' }
  }
};

const BoardSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'array', items: Column }
  },
};

// Options for get all items
const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: BoardSchema,
      },
    },
  },
  handler: getBoards,
};

const getBoardOpts = {
  schema: {
    response: {
      200: BoardSchema,
    },
  },
  handler: getBoard,
};

const postBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: { type: 'array', items: Column }
      },
    },
    response: {
      201: BoardSchema,
    },
  },
  handler: addBoard,
};

const deleteBoardOpts = {
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
  handler: deleteBoard,
};

const updateBoardOpts = {
  schema: {
    response: {
      200: BoardSchema,
    },
  },
  handler: updateBoard,
};

function router(fastify, options, done) {
  fastify.get('/boards', getBoardsOpts);
  fastify.get('/boards/:id', getBoardOpts);
  fastify.post('/boards', postBoardOpts);
  fastify.delete('/boards/:id', deleteBoardOpts);
  fastify.put('/boards/:id', updateBoardOpts);
  done();
}

module.exports = router;
