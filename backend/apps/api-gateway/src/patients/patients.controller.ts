import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Post()
    create(@Body() dto: CreatePatientDto) {
        return this.patientsService.create(dto);
    }

    @Get()
    async findAll() {

        const patients = await this.patientsService.findAll();
        return {
            data: patients,
            total: patients.length,
        };
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.patientsService.findOne(id);
    }

}
