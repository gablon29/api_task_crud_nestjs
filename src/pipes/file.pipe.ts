import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !value.originalname) {
      throw new BadRequestException('File is missing');
    }
    if (value.size > 1000000) {
      throw new BadRequestException('File too large');
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = extname(value.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`,
      );
    }

    return value;
  }
}
