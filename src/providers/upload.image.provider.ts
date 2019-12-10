import {Connection} from 'mongoose';
import {UploadImageSchema} from '../schemas/upload.image.schema';
import {Consts} from '../consts';

export const uploadImageProviders = [
  {
    provide: Consts.upload_image_rep,
    useFactory: (connection: Connection) => connection.model('UploadImage', UploadImageSchema),
    inject: [Consts.dm_provide],
  },
];
