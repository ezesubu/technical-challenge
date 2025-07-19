import { Controller, Get, Param } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { Status } from './entities/status.entity';

@Controller('statuses')
export class StatusesController {
    constructor(private readonly statusesService: StatusesService) {}

    @Get()
    findAll(): Promise<Status[]> {
        return this.statusesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Status> {
        return this.statusesService.findOne(id);
    }
}
