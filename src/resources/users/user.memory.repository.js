let users = [];

const getAll = () => users;

const getById = (id) => users.find((record) => record.id === id);

const create = (data) => {
  users = [...users, data];

  return data;
};

const remove = (id) => {
  users = users.filter((item) => item.id !== id);
};

const update = (id, data) => {
  const index = users.findIndex(record => id === record.id);
  if (index === -1) {
    return false;
  }

  users[index] = data;

  return true;
};

module.exports = { getAll, getById, create, remove, update };
