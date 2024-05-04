import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from 'src/config/model/Image.model';
import { InjectModel } from '@nestjs/sequelize';
import { ImageUpload } from '../interface/data.interface';
@Controller('files')
export class FileController {
  constructor(@InjectModel(Image) private imageModel: typeof Image) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param('id') id: number) {
    try {
      const findFile = await this.imageModel.findOne({
        where: { userId: id },
      });
      if (!findFile) {
        await this.imageModel.create({ userId: id });
      }

      const data: ImageUpload = {
        userId: id,
        filename: file.originalname,
        size: file.size,
        content: file.buffer,
      };
      if (!data) {
        throw new Error('No image data found');
      }

      console.log('File:', file.originalname);
      console.log('Size:', file.size);
      console.log('Content:', file.buffer);

      const updateResult = await this.imageModel.update(data, {
        where: { userId: id },
      });
      console.log('Update result:', updateResult); // Check the update result

      return { message: 'Uploaded' };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file'); // Propagate the error to the caller
    }
  }
}
