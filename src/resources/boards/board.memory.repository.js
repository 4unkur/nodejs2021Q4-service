let boards = [];

const getAll = () => boards;

const getById = (id) => boards.find((record) => record.id === id);

const create = (data) => {
  boards = [...boards, data];

  return data;
};

const remove = (id) => {
  boards = boards.filter((item) => item.id !== id);
};

const update = (id, data) => {
  const index = boards.findIndex(record => id === record.id);
  if (index === -1) {
    return false;
  }

  boards[index] = data;

  return true;
};

module.exports = { getAll, getById, create, remove, update };
