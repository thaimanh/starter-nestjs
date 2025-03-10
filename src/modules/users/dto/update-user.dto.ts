import { OmitType } from '@nestjs/mapped-types'
import { User } from '../../../entities/user.entity'

export class UpdateUserDto extends OmitType(User, ['role', 'password'] as const) {}
