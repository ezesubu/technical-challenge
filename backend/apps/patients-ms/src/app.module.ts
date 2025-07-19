import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { Patient } from './patients/entities/patient.entity';
import { PatientsController } from "./patients/patients.controller";
import { PatientsService } from "./patients/patients.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, '../../../apps/patients-ms/.env')
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
        TypeOrmModule.forFeature([Patient])
    ],
    controllers: [PatientsController],
    providers: [PatientsService],
})
export class AppModule {}
