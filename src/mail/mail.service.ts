import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"
@Injectable()
export class MailService {
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"farrukhmeyliyev001@gmail.com",
                pass:"tnfk uvnd hdxr uzya",
            },
        });
    }
    async sendMail(to:any,subject:any, text: any){
        let message = this.transporter.sendMail({
            to,
            subject,
            text
        });
        return message
    }
}

