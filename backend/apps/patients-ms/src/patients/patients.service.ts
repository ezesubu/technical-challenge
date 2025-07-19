import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly repo: Repository<Patient>,
    ) {}

    async create(dto: CreatePatientDto): Promise<Patient> {
        console.log("create paciente en patientes service patients-ms")
        const patient = this.repo.create(dto);
        return this.repo.save(patient);
    }

    async findAll(): Promise<Patient[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<Patient> {
        const patient = await this.repo.findOne({ where: { id } });
        if (!patient) throw new NotFoundException('Patient not found');
        return patient;
    }

    async update(id: string, dto: UpdatePatientDto): Promise<Patient> {
        const patient = await this.findOne(id);
        Object.assign(patient, dto);
        return this.repo.save(patient);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) throw new NotFoundException('Patient not found');
    }
}
