import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProviderDto } from './dto/create-provider.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProvidersService {
    constructor(
        @Inject('PROVIDERS_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createProviderDto: CreateProviderDto) {
        return firstValueFrom(
            this.client.send('create-provider', createProviderDto),
        );
    }

    async findAll() {
        return firstValueFrom(this.client.send('find-all-providers', {}));
    }

    async findOne(id: string) {
        return firstValueFrom(this.client.send('find-provider-by-id', id));
    }
}
