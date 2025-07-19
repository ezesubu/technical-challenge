import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProviderDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
