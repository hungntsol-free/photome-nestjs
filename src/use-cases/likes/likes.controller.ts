import { Controller } from '@nestjs/common';
import { Get, Post, Query, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PostLikeRequest } from './likes.request';
import { LikeService } from './likes.service';

@Controller('api/like')
export class LikeController {
  constructor(private readonly service: LikeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(
    @Query('id_User') idUser: string,
    @Query('id_Newfeed') idNewFeed: string,
  ) {
    return await this.service.get(idUser, idNewFeed);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async post(@Body() request: PostLikeRequest) {
    return await this.service.post(request.id_User, request.id_Newfeed);
  }

  @Post('updateliked')
  @HttpCode(HttpStatus.OK)
  async updateLike(@Body() request: PostLikeRequest) {
    return await this.service.updateLike(request.id_User, request.id_Newfeed);
  }

  @Post('deleteliked')
  @HttpCode(HttpStatus.OK)
  async deleteLike(@Body() request: PostLikeRequest) {
    return await this.service.deleteLike(request.id_User, request.id_Newfeed);
  }
}
