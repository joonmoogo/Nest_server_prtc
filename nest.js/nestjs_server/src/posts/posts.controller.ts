import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

import PostDTO from 'src/dto/postDTO';



@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  // GET /posts
  //  모든 post를 가져온다
  @Get()
  getPosts(): PostDTO[] {
    return this.postsService.getAllPosts();
  }

  // GET /posts:id
  //  id에 해당하는 post를 가져온다
  @Get(':id')
  getPost(@Param('id') id: string): PostDTO {
    return this.postsService.getPostById(id);
  }

  // POST /posts
  //  author,title,content를 받아 새로운 post를 생성한다
  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostDTO {
    return this.postsService.createPost(author,title,content);
  }

  // PUT / posts/:id
  //  id에 해당하는 post를 변경한다
  //  author,title,content 변경 가능하다.
  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): PostDTO {
    return this.postsService.updatePost(id,author,title,content);
  }

  // DELETE /posts/:id
  //  id에 해당하는 post를 삭제한다.
  @Delete(':id')
  deletePost(@Param() id: string): string {
    return this.postsService.deletePost(id);
  }
}
