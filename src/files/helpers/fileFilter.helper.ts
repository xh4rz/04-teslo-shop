import { HttpException, HttpStatus } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('file is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validExtensions.includes(fileExtension)) {
    return callback(
      new HttpException(
        `${file.mimetype} is not a valid document`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      false,
    );
  }

  callback(null, true);
};
