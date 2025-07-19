import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProvidersService {
    constructor(
        @InjectRepository(Provider)
        private providerRepo: Repository<Provider>,
    ) {}

    create(dto: CreateProviderDto) {
        const provider = this.providerRepo.create(dto);
        return this.providerRepo.save(provider);
    }

    findAll() {
        return this.providerRepo.find();
    }

    async findOne(id: string) {
        const provider = await this.providerRepo.findOne({ where: { id } });
        if (!provider) throw new NotFoundException('Provider not found');
        return provider;
    }
}
