let tasks = [];

const getAll = (boardId) => tasks.filter(task => task.boardId === boardId);

const getById = (taskId) => tasks.find((record) => record.id === taskId);

const create = (data) => {
  tasks = [...tasks, data];

  return data;
};

const remove = (id, column = 'id') => {
  tasks = tasks.filter((item) => item[column] !== id);
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
