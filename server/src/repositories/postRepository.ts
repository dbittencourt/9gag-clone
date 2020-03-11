import mongoose from 'mongoose';
import { Post } from '../services/post/post.types';
import { Service } from 'typedi';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        index: true,
    },

    tags: [String],

    image: {
        type: String,
        required: true,
    },
});

@Service()
export default class PostRepository {
    //todo: add logging

    private postEntity = mongoose.model('post', PostSchema);

    private mapEntityToPost(entity: mongoose.Document): Post {
        const post = entity.toObject();
        return {
            id: post['_id'],
            title: post['title'],
            tags: post['tags'],
            image: post['image'],
        };
    }

    async getPostsAsync(): Promise<Post[]> {
        const entities = await this.postEntity.find({});
        return entities.map(this.mapEntityToPost);
    }

    async getPostAsync(id: string): Promise<Post | null> {
        const entity = await this.postEntity.findById(id);

        return entity ? this.mapEntityToPost(entity) : null;
    }

    async addPostAsync(post: Post) {
        const newPost = new this.postEntity({ title: post.title, tags: post.tags, image: post.image });
        await newPost.save();
    }

    async updatePostAsync(post: Post) {
        await this.postEntity.findByIdAndUpdate(post.id, {
            title: post.title,
            tags: post.tags,
            image: post.image,
        });
    }

    async removePostAsync(id: string) {
        await this.postEntity.findByIdAndDelete(id);
    }
}
