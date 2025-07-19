import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProvidersController } from './provider.controller';
import { ProvidersService } from './provider.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PROVIDERS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 4002,
                },
            },
        ]),
    ],
    controllers: [ProvidersController],
    providers: [ProvidersService],
})
export class ProvidersModule {}
