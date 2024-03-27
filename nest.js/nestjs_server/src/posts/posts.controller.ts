import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

import PostDTO from 'src/dto/postDTO';

let posts: PostDTO[] = [
  {
    id: 1,
    author: 'newjeans',
    title: '뉴진스',
    content: '디토',
    likeCount: 100,
    commentCount: 100
  },
  {
    id: 2,
    author: 'aespa',
    title: '에스파',
    content: '블랙맘바',
    likeCount: 100,
    commentCount: 100
  },
  {
    id: 3,
    author: 'blackpink',
    title: '블랙핑크',
    content: '불장난',
    likeCount: 100,
    commentCount: 100
  }
]

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  // GET /posts
  //  모든 post를 가져온다
  @Get()
  getPosts(): PostDTO[] {
    return posts
  }

  // GET /posts:id
  //  id에 해당하는 post를 가져온다
  @Get(':id')
  getPost(@Param('id') id: string): PostDTO {
    const post = posts.find((post) => post.id === +id)
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  // POST /posts
  //  author,title,content를 받아 새로운 post를 생성한다
  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostDTO {
    const post: PostDTO = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    }
    posts = [...posts, post];
    return post
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
    const post: PostDTO = posts.find((post) => { post.id === +id });
    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost => prevPost.id === +id ? post : prevPost))

    return post
  }

  @Delete(':id')
  deletePost(@Param() id: string): string {

    const post: PostDTO = posts.find((post) => { post.id === +id });

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter(post => post.id !== +id);
    return id
  }
}
