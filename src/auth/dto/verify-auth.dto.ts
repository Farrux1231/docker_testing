import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class VerifyAuthDto {
@ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

@ApiProperty({
    description: 'verify code',
    example: '372939',
  })
  @IsNotEmpty()
  code: number;

}