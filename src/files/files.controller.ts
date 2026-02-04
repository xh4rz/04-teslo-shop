import {
  Controller,
  Post,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor(
      'file',
      //   {
      //   fileFilter: fileFilter,
      // }
    ),
  )
  uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /image\/(jpeg|png|gif)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      fileName: file.originalname,
    };
  }
}
