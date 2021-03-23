const users = [];

const addUser = ({ id, username, servername }) => {
	username = username.trim().toLowerCase();
	servername = servername.trim().toLowerCase();

	const existingUser = users.find((user) => {
		user.servername === servername && user.username === username;
	});

	if (existingUser) {
		return { error: 'Username is taken' };
	}

	const user = { id, username, servername };

	users.push(user);

	return { user };
};

const removeUser = (id) => {
	const { index } = users.findIndex((user) => {
		user.id === id;
	});

	if (index !== -1) {
		return users.splice(index, 1);
	}
};

const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (servername) =>
	users.filter((user) => user.servername === servername);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
