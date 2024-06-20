import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Business } from './schemas/business.schema';
import { HydratedDocument, Model } from 'mongoose';
import { endOfDay, format, startOfDay } from 'date-fns';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private readonly businessModel: Model<Business>,
  ) {
  }

  create(createBusinessDto: CreateBusinessDto) {
    return 'This action adds a new business';
  }

  async findAll(name?: string, page: number = 1, limit: number = 10, date_from?: Date, date_to?: Date): Promise<any> {
    const pipeline = [];
    const matchStage: any = {};
    if (name) {
      matchStage.enterprise_name = name;
    }
    if (date_from) {
      matchStage.created_at = { ...matchStage.created_at, $gte: startOfDay(new Date(date_from)) };
    }

    if (date_to) {
      matchStage.created_at = { ...matchStage.created_at, $lte: endOfDay(new Date(date_to)) };
    }
    pipeline.push(
      {
        $match: matchStage,
      },
      {
        $addFields: {
          lcg: { $toString: '$lcg_account' },
        },
      },
      {
        $project: {
          name: '$enterprise_name',
          lcg: '$lcg',
          created_at: 1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    );
    const totalDocuments = await this.businessModel.countDocuments(
      name ? matchStage : {},
    ).exec();

    const results = await this.businessModel.aggregate(pipeline).exec();
    console.table(results)

    const totalData = results.map(result => {
      return ({

        name: result.name,
        created_at: format(new Date(result.created_at), 'HH:mm dd/MM/yyyy'),

      });
    });

    return {
      meta: {
        total: totalDocuments,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalDocuments / limit),
      },
      list: totalData,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
