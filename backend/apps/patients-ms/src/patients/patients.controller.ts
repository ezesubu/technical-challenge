import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller()
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @MessagePattern('create-patient')
    create(dto: CreatePatientDto) {
        console.log("entrando")
        return this.patientsService.create(dto);
    }

    @MessagePattern('find-all-patients')
    findAll() {
        return this.patientsService.findAll();
    }

    @MessagePattern('find-patient-by-id')
    findOne(id: string) {
        return this.patientsService.findOne(id);
    }
}
