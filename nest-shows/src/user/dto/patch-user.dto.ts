import { CreateUserDto } from './create-user.dto';
import { PickType } from '@nestjs/swagger';

export class PatchUserDto extends PickType(CreateUserDto, ['password']) {}
