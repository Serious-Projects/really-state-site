import User from '../mongodb/models/user.js';

export default {
	async getAllUsers(req, res) {
		const { _end } = req.query;
		try {
			const users = await User.find({}).limit(_end);
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	async getUserInfoById(req, res) {
		const { id } = req.params;
		try {
			const user = await User.findOne({ _id: id }).populate('allProperties');
			if (user) {
				return res.status(200).json(user);
			} else {
				return res.status(404).json({ message: 'User not found' });
			}
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	async createUser(req, res) {
		const { name, email, avatar } = req.body;
		try {
			const userExists = await User.findOne({ email });
			if (userExists) {
				return res.status(200).json(userExists);
			}
			const newUser = await User.create({ name, email, avatar });
			res.status(200).json(newUser);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
};
