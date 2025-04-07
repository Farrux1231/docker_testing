import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Mahsulot nomi',
    example: 'Smartfon',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Mahsulotning tavsifi',
    example: 'Yangi model smartfon, 128GB xotira',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({
    description: 'Mahsulot narxi',
    example: 499.99,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Kategoriya IDsi',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  categoryId: number;
}
