import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { CreateProviderDto } from './dto/create-provider.dto';
import {ProvidersService} from "./provider.service";

@Controller('providers')
export class ProvidersController {
    constructor(private readonly providersService: ProvidersService) {}

    @Post()
    async create(@Body() dto: CreateProviderDto) {
        const provider = await this.providersService.create(dto);
        return { data: provider };
    }

    @Get()
    async findAll() {
        const providers = await this.providersService.findAll();
        return {
            data: providers,
            total: providers.length,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const provider = await this.providersService.findOne(id);
        return { data: provider };
    }
}
