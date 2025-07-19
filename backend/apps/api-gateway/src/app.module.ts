import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import {PatientsModule} from "./patients/patients.module";
import {ProvidersModule} from "./providers/providers.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, '../../../apps/api-gateway/.env')
        }),
        PatientsModule,
        ProvidersModule
    ],
})
export class AppModule {}
