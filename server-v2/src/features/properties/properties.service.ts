import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { v2 } from 'cloudinary';
import { Response } from 'express';
import { Connection, Model } from 'mongoose';
import { User } from '../user/user.schema';
import { PropertyDocument, PropertyQueryType, UserDocument } from './../../types.d';
import { CreatePropertyDto } from './property.dto';
import { Property } from './property.schema';

@Injectable()
export class PropertyService {
	constructor(
		@InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		@InjectConnection() private readonly connection: Connection,
	) {}

	async getAllProperties(res: Response, qp: PropertyQueryType): Promise<PropertyDocument[]> {
		const query = {} as any;
		if (qp.propertyType !== '') query.property = qp.propertyType;
		if (qp.title_like !== '') query.title = { $regex: qp.title_like, $options: 'i' };

		try {
			const propertiesCount = await this.propertyModel.countDocuments({ query });
			const properties = await this.propertyModel
				.find(query)
				.limit(qp._start)
				.skip(qp._end)
				.sort({ [qp._sort]: qp._order });
			console.log(properties);
			res.header('x-total-count', String(propertiesCount));
			res.header('Access-Control-Expose-Headers', 'x-total-count');
			return properties;
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}

	async getPropertyDetail(id: string): Promise<PropertyDocument> {
		try {
			const propertyExists = await this.propertyModel.findById(id).populate('creator');
			if (!propertyExists) throw new NotFoundException(`Property does not exist for id: ${id}`);
			return propertyExists;
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}

	async createProperty(propertyDto: CreatePropertyDto): Promise<{ message: string }> {
		try {
			const session = await this.connection.startSession();
			const user = await this.userModel.findOne({ email: propertyDto.email }).session(session);
			if (!user) throw new NotFoundException('User not found');
			const photoUrl = await v2.uploader.upload(propertyDto.photo);
			const newProperty = await this.propertyModel.create({
				title: propertyDto.title,
				description: propertyDto.description,
				propertyType: propertyDto.propertyType,
				location: propertyDto.location,
				price: propertyDto.price,
				photo: photoUrl.url,
				creator: user._id,
			});
			user.allProperties.push(newProperty._id);
			await user.save();
			await session.commitTransaction();
			return { message: 'Property created successfully' };
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}

	async updateProperty(userId: string, propertyDto: CreatePropertyDto): Promise<{ message: string }> {
		try {
			const photoUrl = await v2.uploader.upload(propertyDto.photo);
			await this.propertyModel.findByIdAndUpdate(
				{ _id: userId },
				{
					title: propertyDto.title,
					description: propertyDto.description,
					propertyType: propertyDto.propertyType,
					location: propertyDto.location,
					price: propertyDto.price,
					photo: photoUrl.url || propertyDto.photo,
				},
			);
			return { message: 'Property updated successfully' };
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}

	async deleteProperty(userId: string) {
		try {
			const propertyToDelete = await this.propertyModel.findById(userId).populate('creator');
			if (!propertyToDelete) {
				throw new Error('Property not found');
			}
			// Performing the atomic database transaction
			const session = await this.connection.startSession();
			session.startTransaction();
			propertyToDelete.remove({ session });
			propertyToDelete.creator.allProperties.pull(propertyToDelete);
			await propertyToDelete.creator?.save({ session });
			await session.commitTransaction();
			return { message: 'Property deleted successfully' };
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}
}
