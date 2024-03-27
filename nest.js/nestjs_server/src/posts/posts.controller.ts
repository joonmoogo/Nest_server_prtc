import { Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

import PostDTO from 'src/dto/postDTO';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  getPost(): PostDTO {
    return {
      author: 'newjeans',
      title: '뉴진스',
      content: '디토',
      likeCount: 100,
      commentCount: 100
    }
  }

  @Post()
  postPost(): PostDTO {
    return {
      author: 'newjeans',
      title: '뉴진스',
      content: '디토',
      likeCount: 100,
      commentCount: 100
    }
  }
}
