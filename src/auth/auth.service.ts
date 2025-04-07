import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { registerAuthDto } from './dto/register.dto';
import { loginAuthDto } from './dto/login.dto.';
@Injectable()
export class AuthService {
  private otp:number

  constructor(
    private readonly jwtService: JwtService,
    private prisma:PrismaService,
    private mailer:MailService
  
  ) {}

  async findUser(email:string){
    let user = await this.prisma.user.findUnique({where:{email}})
    return user
  }

  async register( data: registerAuthDto) {
    try {
      let user = await this.findUser(data.email)
    if(user){
      throw new BadRequestException()
    }
    let hash = bcrypt.hashSync(data.password, 7);
    await this.prisma.user.create({data:{...data, password:hash}})
     this.otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    await this.mailer.sendMail(`${data.email}`, "Tastiqlash kodi", `${this.otp}`)

    return `Successfully registered check your mail ${data.email}`;
    } catch (error) {
      console.log(error.message);
      return "some  thing rong"
    }
  }

  async verifyProfil(data:VerifyAuthDto){
    if (data.code === this.otp) {
      let email = data.email
      await this.prisma.user.update({
        where: {
          
          email
        },
        data: {
          status: true,
        },
      });
      this.otp = 0
      return "Profil aktivlashdi"
    }
    return 'Notogri kod'
    
  }

  async login(data: loginAuthDto) {
    try {
      let user = await this.findUser(data.email);
      if(!user){
        throw new BadRequestException()
      }
  
      let match = bcrypt.compareSync(data.password, user.password)
      if(!match){
        throw new BadRequestException()
      }
  
  
      return {
        access_token: this.generateAccessToken({ id: user.id, name: user.name }),
        refresh_token: this.genereteRefreshToken({ id: user.id, name: user.name }),
      };
    } catch (error) {
      console.log(error.message,"asdf");
      return {message:"asdfgh"}
    }
  }


  refreshToken(req: Request) {
    let { id, name } = req['user'];

    return { access_token: this.generateAccessToken({ id, name }) };
  }

  genereteRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'refresh_key',
      expiresIn: '30m',
    });
  }

  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'acess_key',
      expiresIn: '30m',
    });
  }
}
