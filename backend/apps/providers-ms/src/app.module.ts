import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Provider} from "./providers/entities/provider.entity";
import {ProvidersController} from "./providers/providers.controller";
import {ProvidersService} from "./providers/providers.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, '../../../apps/providers-ms/.env')
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || '5432'),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            }
        }),
        TypeOrmModule.forFeature([Provider])
    ],
    controllers: [ProvidersController],
    providers: [ProvidersService]
})
export class AppModule {}
