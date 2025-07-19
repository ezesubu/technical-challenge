import {
    IsString,
    IsUUID,
    IsEmail,
    IsNotEmpty,
} from 'class-validator';

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsUUID()
    provider_id: string;

    @IsUUID()
    status_id: string;
}
