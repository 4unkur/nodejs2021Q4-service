const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

const getById = (id) => taskRepo.getById(id);

const create = (data) => taskRepo.create(data);

const remove = (id) => taskRepo.remove(id)

const update = (id, data) => taskRepo.update(id, data)

module.exports = { getAll, getById, create, remove, update };
