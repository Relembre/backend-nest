import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { LembreteMedicamentoService } from "./lembrete-medicamento.service";
import { MailerService } from "@nestjs-modules/mailer";
import { UserService } from "../user.service";

@Injectable()
export class LembreteMedicamentoJobs {
    private diasSemana = ["Domingos", "Segundas-feira", "Terças-feira", "Quartas-feira", "Quintas-feira", "Sextas-feira", "Sábados"]
    private logger = new Logger(LembreteMedicamentoJobs.name)
    constructor(private lembreteService: LembreteMedicamentoService,
        private readonly userService: UserService) { }


    @Cron("15 * * * * *")
    async addJobEnviarEmailLembreteMedicamento() {
        // const lembretes = await this.lembreteService.findAll()
        // this.logger.log(`Buscando todos os lembretes, total: ${lembretes.length}`);

        // lembretes.forEach(async (item) => {
        //     if (item.diaSemana == new Date().getDay() + 1) {
        //         const user = await this.userService.procurarPorId(item.userId)
        //         this.mailerService.sendMail({
        //             to: user.email,
        //             subject: "Lembrete de uso de medicamento",
        //             from: 'lembreteapp@gmail.com',
        //             html: `
        //                 <style>
        //                     body {
        //                         width: 100%;
        //                         padding: 16px;
        //                         font-family: sans-serif;
        //                         color: #333;
        //                     }
        //                 </style>
        //                 <body>
        //                     <h1>Lembrete de medicação de uso</h1>
        //                     <p>Olá ${user.nome}, tudo bem?</p>
        //                     <p>Viemos aqui para lembrar você para tomar seu medicamento que você deixou agendados todas as ${this.diasSemana.at(item.diaSemana - 1)}</p>
        //                     <p>Descrição: ${item.descricao}</p>
        //                     <p>Horário: ${item.horario}</p>
        //                 </body>
        //             `
        //         })
        //     }
        // })


    }

}