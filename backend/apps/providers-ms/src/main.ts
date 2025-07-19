import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 4002, // este puerto debe coincidir con el que el API Gateway espera
        },
    });

    await app.listen();
    console.log('✅ Providers microservice running on port 4002');
}
bootstrap();
