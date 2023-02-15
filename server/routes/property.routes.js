import express from 'express';
import propertyController from '../controllers/property.controller.js';

const propertyRoutes = express.Router();

propertyRoutes
	.route('/')
	.get(propertyController.getAllProperties)
	.post(propertyController.createProperty);

propertyRoutes
	.route('/:id')
	.get(propertyController.getPropertyDetail)
	.patch(propertyController.updateProperty)
	.delete(propertyController.deleteProperty);

export default propertyRoutes;
