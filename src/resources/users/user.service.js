const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service')

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (data) => usersRepo.create(data);

const remove = (id) => {
  usersRepo.remove(id);
  taskService.unnasignUser(id)
}

const update = (id, data) => usersRepo.update(id, data)

module.exports = { getAll, getById, create, remove, update };
