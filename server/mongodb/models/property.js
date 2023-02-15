import mongoose, { Types } from 'mongoose';

const PropertySchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	propertyType: { type: String, required: true },
	location: { type: String, required: true },
	price: { type: Number, required: true },
	photo: { type: String, required: true },
	creator: { type: Types.ObjectId, ref: 'User' },
});

const userModel = mongoose.model('Property', PropertySchema);

export default userModel;
