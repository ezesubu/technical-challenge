import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProvidersService } from "./providers.service";
import { CreateProviderDto } from "./dto/create-provider.dto";

@Controller()
export class ProvidersController {
    constructor(private readonly providersService: ProvidersService) {}

    @MessagePattern('create-patient')
    create(dto: CreateProviderDto) {
        return this.providersService.create(dto);
    }

    @MessagePattern('find-all-patients')
    findAll() {
        return this.providersService.findAll();
    }

    @MessagePattern('find-patient-by-id')
    findOne(id: string) {
        return this.providersService.findOne(id);
    }
}
