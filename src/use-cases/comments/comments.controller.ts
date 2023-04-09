import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DeleteCommentRequest, PostCommentRequest } from './comment.request';
import { CommentService } from './comments.service';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getComment(@Query('id_Newfeed') idNewFeed: string) {
    return await this.service.getAllOfNewFeed(idNewFeed);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async saveComment(@Body() request: PostCommentRequest) {
    return await this.service.saveComment(
      request.id_User,
      request.id_Newfeed,
      request.comment,
    );
  }

  @Post('deletecomment')
  @HttpCode(HttpStatus.OK)
  async deleteComment(@Body() request: DeleteCommentRequest) {
    return await this.service.deleteComment(
      request.id_User,
      request.id_Newfeed,
      request.id_Comment,
    );
  }
}
