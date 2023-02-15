import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

// Load environment variables
dotenv.config();

// Configure cloudinary service
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
	async getAllProperties(req, res) {
		const { _start, _end, _order, _sort, title_like = '', propertyType = '' } = req.query;

		const query = {};
		if (propertyType !== '') {
			query.property = propertyType;
		}
		if (title_like !== '') {
			query.title = { $regex: title_like, $options: 'i' };
		}

		try {
			const count = await Property.countDocuments({ query });
			const properties = await Property.find(query)
				.limit(_end)
				.skip(_start)
				.sort({ [_sort]: _order });

			res.header('x-total-count', count);
			res.header('Access-Control-Expose-Headers', 'x-total-count');
			res.status(200).json(properties);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	async getPropertyDetail(req, res) {
		const { id } = req.params;
		try {
			const propertyExists = await Property.findOne({ _id: id }).populate('creator');
			if (propertyExists) {
				res.status(200).json(propertyExists);
			} else {
				res.status(404).json({ detail: 'Property not found' });
			}
		} catch (err) {
			res.status(500).json({ detail: err.message });
		}
	},

	async createProperty(req, res) {
		try {
			const { title, description, propertyType, location, price, photo, email } = req.body;
			const session = await mongoose.startSession();

			session.startTransaction();
			const user = await User.findOne({ email }).session(session);
			if (!user) throw new Error('User not found');
			const photoUrl = await cloudinary.uploader.upload(photo);
			const newProperty = await Property.create({
				title,
				description,
				propertyType,
				location,
				price,
				photo: photoUrl.url,
				creator: user._id,
			});
			user.allProperties.push(newProperty._id);
			await user.save({ session });
			await session.commitTransaction();

			res.status(200).json({ message: 'Property created successfully' });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	async updateProperty(req, res) {
		const { id } = req.params;
		const { title, description, propertyType, location, price, photo } = req.body;
		try {
			const photoUrl = await cloudinary.uploader.upload(photo);
			await Property.findByIdAndUpdate(
				{ _id: id },
				{ title, description, propertyType, location, price, photo: photoUrl.url || photo },
			);
			res.status(200).json({ message: 'Property updated successfully' });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	async deleteProperty(req, res) {
		const { id } = req.params;
		try {
			const propertyToDelete = await Property.findById(id).populate('creator');
			if (!propertyToDelete) {
				throw new Error('Property not found');
			}

			const session = await mongoose.startSession();
			session.startTransaction();
			propertyToDelete.remove({ session });
			propertyToDelete.creator.allProperties.pull(propertyToDelete);
			await propertyToDelete.creator.save({ session });
			await session.commitTransaction();

			res.status(200).json({ message: 'Property deleted successfully' });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},
};
