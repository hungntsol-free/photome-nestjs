import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Comment,
  CommentSchema,
  Follow,
  FollowSchema,
  Like,
  LikeSchema,
  NewFeed,
  NewFeedSchema,
  Post,
  PostSchema,
  Profile,
  ProfileSchema,
  User,
  UserSchema,
} from '@schemas';
import {
  CommentCollectionProvider,
  FollowCollectionProvider,
  LikeCollectionProvider,
  NewFeedCollectionProvider,
  PostCollectionProvider,
  ProfileCollectionProvider,
  UserCollectionProvider,
} from './providers';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB__CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Follow.name, schema: FollowSchema },
      { name: Like.name, schema: LikeSchema },
      { name: NewFeed.name, schema: NewFeedSchema },
      { name: Post.name, schema: PostSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [
    CommentCollectionProvider,
    FollowCollectionProvider,
    LikeCollectionProvider,
    NewFeedCollectionProvider,
    PostCollectionProvider,
    ProfileCollectionProvider,
    UserCollectionProvider,
  ],
  providers: [
    CommentCollectionProvider,
    FollowCollectionProvider,
    LikeCollectionProvider,
    NewFeedCollectionProvider,
    PostCollectionProvider,
    ProfileCollectionProvider,
    UserCollectionProvider,
  ],
})
export class DbCollectionModule {}
