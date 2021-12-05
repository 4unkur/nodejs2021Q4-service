const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.service')

const getAll = () => boardRepo.getAll();

const getById = (id) => boardRepo.getById(id);

const create = (data) => boardRepo.create(data);

const remove = (id) => {
  boardRepo.remove(id);
  taskRepo.removeByBoardId(id)
}

const update = (id, data) => boardRepo.update(id, data)

module.exports = { getAll, getById, create, remove, update };
