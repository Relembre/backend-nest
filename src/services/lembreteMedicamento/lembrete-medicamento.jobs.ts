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
        private readonly mailerService: MailerService,
        private readonly userService: UserService) { }


    @Cron("10 * * * * *")
    async addJobEnviarEmailLembreteMedicamento() {
        const lembretes = await this.lembreteService.findAll()
        this.logger.log(`Buscando todos os lembretes, total: ${lembretes.length}`);
        this.logger.log(`Dia atual: ${new Date().getDay() + 1}`);
        lembretes.forEach(async (item) => {
            this.logger.log(`Dia lembrete: ${item.diaSemana}`);
            if (item.diaSemana == new Date().getDay() + 1) {
                const user = await this.userService.procurarPorId(item.userId)
                this.mailerService.sendMail({
                    to: user.email,
                    subject: "Lembrete de uso de medicamento",
                    from: 'lembreteapp@gmail.com',
                    html: `
                        <style>
                            body {
                                width: 100%;
                                font-family: sans-serif;
                                color: #333;
                            }
                            div {
                                margin: 0 auto;
                                padding: 16px;
                                border-radius: 4px;
                                border: 1px solid #4448;
                            }
                        </style>
                        <body>
                            <div>
                                <h3>Lembrete de medicação de uso</h3>
                                <p>Olá ${user.nome}, tudo bem?</p>
                                <p>Viemos aqui para lembrar você para tomar seu medicamento que você deixou agendados todas as ${this.diasSemana.at(item.diaSemana - 1)}</p>
                                <strong>Detalhes: </strong>
                                <p><strong>Medicamento </strong>: ${item.nome}</p>
                                <p><strong>Descrição</strong>: ${item.descricao}</p>
                                <p><strong>Horário</strong>: ${item.horario}</p>
                            </div>
                        </body>
                    `
                })
            }
        })


    }

}