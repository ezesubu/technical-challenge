import { IsString } from 'class-validator';

export class CreateProviderDto {
    @IsString()
    full_name: string;

    @IsString()
    specialty: string;
}
