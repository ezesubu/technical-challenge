import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Status } from "./statatuses/entities/status.entity";
import { StatusesController } from "./statatuses/statuses.controller";
import { StatusesService } from "./statatuses/statuses.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, '../../../apps/statuses-ms/.env')
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
        TypeOrmModule.forFeature([Status])
    ],
    controllers: [StatusesController],
    providers: [StatusesService],

})
export class AppModule {}



