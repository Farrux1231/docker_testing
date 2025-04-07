import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Kategoriya nomi',
    example: 'Elektronika',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
