const taskRepo = require('./task.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);

const getById = (taskId) => taskRepo.getById(taskId);

const create = (data) => taskRepo.create(data);

const remove = (id) => taskRepo.remove(id)

const removeByBoardId = (boardId) => taskRepo.remove(boardId, 'boardId')

const update = (id, data) => taskRepo.update(id, data)

module.exports = { getAll, getById, create, remove, update, removeByBoardId };
