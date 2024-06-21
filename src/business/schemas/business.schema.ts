import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import Decimal from '../../../utils/decimal';
export type BusinessDocument = mongoose.HydratedDocument<Business>;

@Schema({ collection: 'lgo_business', timestamps: true })
export class Business {

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  enterprise_name: string;

  @Prop({ type: String })
  phone_number: string;

  @Prop({ type: String })
  avatar?: string;

  @Prop({ type: String })
  link_gg_map?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: Number })
  lat?: number;

  @Prop({ type: Number })
  long?: number;

  @Prop({ type: String })
  website?: string;

  @Prop({ type: String })
  youtube?: string;

  @Prop({ type: String })
  tiktok?: string;

  @Prop({ type: Number })
  quantity_scans?: number;

  @Prop({ type: String })
  verification_status?: string;

  @Prop({ type: String })
  status?: string;

  @Prop({
    type: Decimal,
    default: Decimal.ZERO,
    get: (value: mongoose.Types.Decimal128) => new Decimal(value.toString()),
    set: (value: string | Decimal) => {
      value = value instanceof Decimal ? value.toFixed() : value.toString();

      return new mongoose.Types.Decimal128(value);
    },
  })
  lcg_account: Decimal;

  @Prop({ type: Map, of: Map })
  time_opens?: Map<string, Map<string,string>>;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);


