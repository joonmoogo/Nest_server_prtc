import { Injectable, NotFoundException } from '@nestjs/common';

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

@Injectable()
export class PostsService {

    getAllPosts() {
        return posts;
    }

    getPostById(id: string) {
        const post = posts.find((post) => post.id === +id)
        if (!post) {
            throw new NotFoundException();
        }
        return post;
    }

    createPost(author: string, title: string, content: string) {
        const post: PostDTO = {
            id: posts[posts.length - 1].id + 1,
            author: author,
            title: title,
            content: content,
            likeCount: 0,
            commentCount: 0,
        }
        posts = [...posts, post];
        return post
    }

    updatePost(id: string, author?: string, title?: string, content?: string) {
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

    deletePost(id: string) {
        const post: PostDTO = posts.find((post) => { post.id === +id });

        if (!post) {
            throw new NotFoundException();
        }

        posts = posts.filter(post => post.id !== +id);
        return id
    }


}
