import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Business } from './schemas/business.schema';
import mongoose from 'mongoose';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false, schema: { default: '1' } })
  @ApiQuery({ name: 'limit', required: false, schema: { default: '10' } })
  @ApiQuery({ name: 'date_from', required: false })
  @ApiQuery({ name: 'date_to', required: false })
  async findAll(
    @Query("name") name?: string,
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
    @Query("date_from") date_from?: Date,
    @Query("date_to") date_to?: Date,
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.businessService.findAll(name, pageNumber, limitNumber, date_from, date_to);
  }

  @Get('/:id')
   async findOne(@Param('id') id: string):Promise<Business> {
    return this.businessService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }
}
