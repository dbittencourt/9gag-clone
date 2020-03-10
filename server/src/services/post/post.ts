import { Service } from 'typedi';
import { Post } from './post.types';

@Service({ global: true })
export class PostService {
    //todo: add logging
    //todo: add post repo

    async getPosts(): Promise<Post[]> {
        throw new Error('not implemented');
    }

    async getPost(id: string): Promise<Post> {
        throw new Error('not implemented');
    }

    async addPost(post: Post) {
        throw new Error('not implemented');
    }

    async updatePost(post: Post) {
        throw new Error('not implemented');
    }

    async deletePost(id: string) {
        throw new Error('not implemented');
    }
}

export default PostService;
