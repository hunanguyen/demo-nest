import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class TimeRange {
  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  start: string;

  @Prop({ type: String, required: true })
  end: string;
}

const TimeRangeSchema = SchemaFactory.createForClass(TimeRange);

@Schema()
class TimeOpens {
  @Prop({ type: TimeRangeSchema, required: true })
  sunday: TimeRange;

  @Prop({ type: TimeRangeSchema, required: true })
  saturday: TimeRange;

  @Prop({ type: TimeRangeSchema, required: true })
  tuesday: TimeRange;

  @Prop({ type: TimeRangeSchema, required: true })
  wednesday: TimeRange;

  @Prop({ type: TimeRangeSchema, required: true })
  thursday: TimeRange;

  @Prop({ type: TimeRangeSchema, required: true })
  friday: TimeRange;

  @Prop({ type: TimeRangeSchema, required: true })
  monday: TimeRange;
}

const TimeOpensSchema = SchemaFactory.createForClass(TimeOpens);
