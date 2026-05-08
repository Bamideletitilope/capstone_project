import {
  Controller, Get, Post, Patch,
  Body, Param, ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiParam,
} from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './member.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('members')
@ApiBearerAuth('JWT-auth')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @Roles('admin', 'librarian')
  @ApiOperation({ summary: 'Get all members — admin and librarian only' })
  @ApiResponse({ status: 200, description: 'List of all members', type: [Member] })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'librarian')
  @ApiOperation({ summary: 'Get a single member by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the member' })
  @ApiResponse({ status: 200, description: 'The member record', type: Member })
  @ApiResponse({ status: 404, description: 'Member not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.membersService.findOne(id);
  }

  @Post()
  @Roles('admin', 'librarian')
  @ApiOperation({ summary: 'Register a new library member' })
  @ApiResponse({ status: 201, description: 'Member created successfully', type: Member })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  create(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto);
  }

  @Patch(':id')
  @Roles('admin', 'librarian')
  @ApiOperation({ summary: 'Update a member record' })
  @ApiParam({ name: 'id', description: 'UUID of the member to update' })
  @ApiResponse({ status: 200, description: 'Member updated successfully', type: Member })
  @ApiResponse({ status: 404, description: 'Member not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMemberDto,
  ) {
    return this.membersService.update(id, dto);
  }

  @Patch(':id/deactivate')
  @Roles('admin')
  @ApiOperation({ summary: 'Deactivate a member — soft delete, admin only' })
  @ApiParam({ name: 'id', description: 'UUID of the member to deactivate' })
  @ApiResponse({ status: 200, description: 'Member deactivated', type: Member })
  @ApiResponse({ status: 404, description: 'Member not found' })
  deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.membersService.deactivate(id);
  }
}