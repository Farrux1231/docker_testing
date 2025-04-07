import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'Role/user.role';

export class CreateAuthDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Your ip adress',
    example: '642.125.45',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  ip: string;

  @ApiProperty({
    description: 'Role of the user (default: user)',
    example: 'user',
    required: false,
  })
  @IsString()
  @IsOptional()
  role: Role = Role.User; 
}
