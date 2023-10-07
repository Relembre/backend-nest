import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SendgridService } from './services/mail/sendgrid.service';
import { ImageGalleryService } from './services/imageGallery/image-gallery.service';
import { ImageGalleryController } from './controllers/image-gallery.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { LembreteController } from './controllers/lembrete.controller';
import { LembreteMedicamentoService } from './services/lembreteMedicamento/lembrete-medicamento.service';
import { LembreteMedicamentoJobs } from './services/lembreteMedicamento/lembrete-medicamento.jobs';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';


@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(),
    // MailerModule.forRoot({
    //   transport: {
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     ignoreTLS: true,
    //     secure: false,
    //     auth: {
    //       user: process.env.LOGIN_MAIL,
    //       pass: process.env.PASS_MAIL,
    //     },
    //   },
    //   defaults: {
    //     from: '"Relebre APP" <relembreapp@gmail.com>',
    //   },
    //   template: {
    //     dir: __dirname + '/templates',
    //     adapter: new EjsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),],
  ],
  controllers: [UsersController, LembreteController, ImageGalleryController],
  providers: [UserService, PrismaService, SendgridService, LembreteMedicamentoService, ImageGalleryService, LembreteMedicamentoJobs],
})
export class AppModule { }
