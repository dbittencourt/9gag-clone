import { Service, Inject } from 'typedi';
import { Post } from './post.types';
import PostRepository from '@src/repositories/postRepository';

@Service()
class PostService {
    //todo: add logging
    //todo: handle exceptions

    @Inject()
    postRepo: PostRepository;

    async getPostsAsync(): Promise<Post[]> {
        return await this.postRepo.getPostsAsync();
    }

    async getPostAsync(id: string): Promise<Post | null> {
        return await this.postRepo.getPostAsync(id);
    }

    async addPostAsync(post: Post) {
        await this.postRepo.addPostAsync(post);
    }

    async updatePostAsync(post: Post) {
        await this.postRepo.updatePostAsync(post);
    }

    async deletePostAsync(id: string) {
        await this.postRepo.removePostAsync(id);
    }
}

export default PostService;
