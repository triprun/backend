import {Controller, Get, Post, Body, HttpCode, Query, Headers, Param} from '@nestjs/common';
import {ChatService} from '../services/chat.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {
  ChatPostCreateDto,
  ChatDialogResponse,
  ChatDialogSwagger,
  ChatPostSendDto,
  ChatGroupSwagger,
  ChatPostGroupCreateDto,
  ChatPostGroupRemoveDto,
  ChatPostGroupSendDto,
  ChatGetDialogListDto,
  ChatDialogByIdDto,
  ChatGetDialogQueryDto,
  ChatPostGroupJoinDto,
  ChatPostGroupDropDto,
} from '../protocol';

@ApiBearerAuth()
@ApiUseTags('chat')
@Controller('chat')
export class ChatController {

  constructor(private readonly chatService: ChatService) {
  }

  @ApiOperation({title: 'Список диалогов'})
  @ApiResponse({status: 200, type: {}})
  @Get('dialog/list')
  @HttpCode(200)
  async dialogList(@Query() query: ChatGetDialogListDto): Promise<any> {
    return this.chatService.dialogList( query);
  }

  @ApiOperation({title: 'Сообщения диалога'})
  @ApiResponse({status: 200, type: {}})
  @Get('dialog/:refType/:ref')
  @HttpCode(200)
  async dialogById(@Param() params: ChatDialogByIdDto, @Query() query: ChatGetDialogQueryDto): Promise<any> {
    return this.chatService.dialogById(params, query);
  }

  @ApiOperation({title: 'Отметить диалог как прочитан'})
  @ApiResponse({status: 200, type: {}})
  @Post('dialog_read/:refType/:ref')
  @HttpCode(200)
  async dialogRead(@Param() params: ChatDialogByIdDto, @Query() query): Promise<any> {
    query.read = 1;
    this.chatService.dialogById(params, query);
    return {};
  }

  @ApiOperation({title: 'Отправить сообщение'})
  @ApiResponse({status: 200, type: {}})
  @Post('send')
  @HttpCode(200)
  async privateSend(@Body() body: ChatPostSendDto, @Query() query): Promise<any> {
    return this.chatService.send(body, query);
  }

  @ApiOperation({title: 'Создать групповой чат'})
  @ApiResponse({status: 200, type: ChatGroupSwagger})
  @Post('conversation/create')
  @HttpCode(200)
  async groupCreate(@Body() body: ChatPostGroupCreateDto, @Query() query): Promise<any> {
    return this.chatService.groupCreate(body, query);
  }

  @ApiOperation({title: 'Добавить пользователя в групповой чат'})
  @ApiResponse({status: 200, type: {}})
  @Post('conversation/join')
  @HttpCode(200)
  async groupJoin(@Body() body: ChatPostGroupJoinDto, @Query() query): Promise<any> {
    return this.chatService.groupJoin(body, query);
  }

  @ApiOperation({title: 'Добавить пользователя в групповой чат'})
  @ApiResponse({status: 200, type: {}})
  @Post('conversation/drop')
  @HttpCode(200)
  async groupDrop(@Body() body: ChatPostGroupDropDto, @Query() query): Promise<any> {
    return this.chatService.groupDrop(body, query);
  }

  @ApiOperation({title: 'Удалить групповой чат'})
  @ApiResponse({status: 200, type: {}})
  @Post('conversation/remove')
  @HttpCode(200)
  async groupRemove(@Body() body: ChatPostGroupRemoveDto, @Query() query): Promise<{}> {
    return this.chatService.groupRemove(body, query);
  }


}
