import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { IUserEntity, UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserDecorator } from 'src/decorators/user.decorator';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateOne(@Body() body: PatchUserDto, @UserDecorator() user: IUserEntity) {
    return this.userService.patch(user, body);
  }
}
