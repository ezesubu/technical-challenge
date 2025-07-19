import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PATIENTS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 4001,
                },
            },
        ]),
    ],
    controllers: [PatientsController],
    providers: [PatientsService],
})
export class PatientsModule {}
