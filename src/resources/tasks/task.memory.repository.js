let tasks = [];

const getAll = () => tasks;

const getById = (id) => tasks.find((record) => record.id === id);

const create = (data) => {
  tasks = [...tasks, data];

  return data;
};

const remove = (id) => {
  tasks = tasks.filter((item) => item.id !== id);
};

const update = (id, data) => {
  const index = tasks.findIndex(record => id === record.id);
  if (index === -1) {
    return false;
  }

  tasks[index] = data;

  return true;
};

module.exports = { getAll, getById, create, remove, update };
