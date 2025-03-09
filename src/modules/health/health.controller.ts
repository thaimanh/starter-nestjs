import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'
import { Public } from '@modules/auth/decorator'

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  checkHealth() {
    return this.healthService.getHealthStatus()
  }
}
