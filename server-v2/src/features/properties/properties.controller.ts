import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { PropertyQueryType } from './../../types.d';
import { PropertyService } from './properties.service';
import { CreatePropertyDto } from './property.dto';

@Controller('properties')
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}

	@Get()
	async getAllProperties(@Response() res: Res, @Query() queryParams: PropertyQueryType) {
		return this.propertyService.getAllProperties(res, queryParams);
	}

	@Post()
	async createProperty(@Body() user: CreatePropertyDto) {
		return this.propertyService.createProperty(user);
	}

	@Get(':id')
	async getPropertyDetail(@Param('id') id: string) {
		return this.propertyService.getPropertyDetail(id);
	}

	@Patch(':id')
	async updateProperty(@Param('id') id: string, @Body() property: CreatePropertyDto) {
		return this.propertyService.updateProperty(id, property);
	}

	@Delete(':id')
	async deleteProperty(@Param('id') id: string) {
		return this.propertyService.deleteProperty(id);
	}
}
