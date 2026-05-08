import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@ApiTags('auth') // groups all routes under "auth" in Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Log in and receive a JWT access token' })
  @ApiResponse({
    status: 200,
    description: 'Login successful — returns JWT token',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth') // shows the padlock icon — route requires a token
  @ApiOperation({ summary: 'Get the currently logged-in user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user',
    type: User,
  })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  getProfile(@CurrentUser() user: any) {
    return this.authService.getProfile(user.id);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log out a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out.' })
  logout(
    @CurrentUser() user: JwtUser,
  ): Promise<{ status: string; message: string }> {
    return this.authService.logout(user.id);
  }
}
