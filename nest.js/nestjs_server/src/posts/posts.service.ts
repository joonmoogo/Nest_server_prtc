import { Injectable, NotFoundException, Post } from '@nestjs/common';

import { Repository } from 'typeorm';
import { PostModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostModel)
        private readonly postsRepository: Repository<PostModel>
    ) { }

    async getAllPosts() {
        // return posts;
        return await this.postsRepository.find();
    }

    async getPostById(id: string) {
        
        const post = await this.postsRepository.findOne({
            where:{
                id:+id
            }
        })
        if(!post){
            throw new NotFoundException();
        }
    }

    async createPost(author: string, title: string, content: string) {

        // Typeorm
        // create -> 저장할 객체를 생성
        // save -> 객체를 저장한다. (create로 만든 객체로)

        const post = {
            author: author,
            title: title,
            content: content,
            likeCount: 0,
            commentCount: 0,
        }
        const createdPost = this.postsRepository.create(post);
        const savedPost = await this.postsRepository.save(createdPost);

        return savedPost
    }

    async updatePost(id: string, author?: string, title?: string, content?: string) {

        // save ->
        // 1) if id가 없으면 자동생성
        // 2) if id가 이미 db에 있으면 업데이트
        // 즉 save는 수정할 때 쓰기도함

        const post = await this.postsRepository.findOne({
            where:{
                id:+id
            }
        })
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

        const newPost = await this.postsRepository.save(post);
        return newPost
    }

    async deletePost(id: string) {
        const post= await this.postsRepository.findOne({
            where:{
                id:+id
            }
        })

        if (!post) {
            throw new NotFoundException();
        }

        await this.postsRepository.delete(id);
        return id
    }


}
