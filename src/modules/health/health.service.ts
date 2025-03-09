import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService {
  getHealthStatus(): string {
    return 'It works properly!'
  }
}
