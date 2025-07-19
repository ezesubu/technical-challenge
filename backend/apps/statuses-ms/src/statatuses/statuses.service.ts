import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusesService {
    constructor(
        @InjectRepository(Status)
        private statusRepository: Repository<Status>,
    ) {}

    async findAll(): Promise<Status[]> {
        return this.statusRepository.find({
            order: { order: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Status> {
        const status = await this.statusRepository.findOne({ where: { id } });
        if (!status) {
            throw new NotFoundException(`Status with id ${id} not found`);
        }
        return status;
    }
}
