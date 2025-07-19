import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientDto } from './dto/create-patient.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PatientsService {
    constructor(
        @Inject('PATIENTS_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createPatientDto: CreatePatientDto) {
        return firstValueFrom(
            this.client.send('create-patient', createPatientDto),
        );
    }

    async findAll() {
        return firstValueFrom(this.client.send('find-all-patients', {}));
    }

    async findOne(id: string) {
        return firstValueFrom(this.client.send('find-patient-by-id', id));
    }
}
