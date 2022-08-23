// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Papercraft, Tag, PapercraftTags, S3Object, Color } = initSchema(schema);

export {
  User,
  Papercraft,
  Tag,
  PapercraftTags,
  S3Object,
  Color
};