import { Request, Response, NextFunction } from 'express';
import { Post } from '@src/services/post/post.types';
import { Router } from 'express';
import Container, { Service } from 'typedi';
import PostService from '@src/services/post';

@Service()
class PostsController {
    public router: Router;

    //todo: add logging
    //todo: fix bug with postService di injection
    constructor() {
        this.router = Router();
        this.router.get('/posts', this.getPostsAsync);
        this.router.get('/posts/:id', this.getPostAsync);
        this.router.post('/posts', this.addPostAsync);
        this.router.put('/posts/:id', this.updatePostAsync);
        this.router.delete('/posts/:id', this.deletePostAsync);
    }
    //todo: parse request parameters
    /**
     * GET /posts
     * @param req request
     * @param res response
     */
    private async getPostsAsync(req: Request, res: Response, next: NextFunction) {
        const postService = Container.get(PostService);
        const posts = await postService.getPostsAsync();
        res.send(posts);
    }

    /**
     * GET /posts/:id
     */
    private async getPostAsync(req: Request, res: Response, next: NextFunction) {
        const postService = Container.get(PostService);
        const post = await postService.getPostAsync(req.params.id);
        if (post) res.send(post);
        else res.sendStatus(404);
    }

    /**
     * POST /posts
     */
    private async addPostAsync(req: Request, res: Response, next: NextFunction) {
        const post: Post = {
            title: req.body.title,
            tags: req.body.tags,
            image: req.body.image,
        };

        try {
            const postService = Container.get(PostService);
            await postService.addPostAsync(post);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    /**
     * PUT /posts/:id
     */
    private async updatePostAsync(req: Request, res: Response, next: NextFunction) {
        const post: Post = {
            id: req.params.id,
            title: req.body.title,
            tags: req.body.tags,
            image: req.body.image,
        };

        const postService = Container.get(PostService);
        await postService.updatePostAsync(post);

        res.sendStatus(200);
    }

    /**
     * DELETE /posts/:id
     */
    private async deletePostAsync(req: Request, res: Response, next: NextFunction) {
        const postService = Container.get(PostService);
        await postService.deletePostAsync(req.params.id);

        res.sendStatus(200);
    }
}

export default PostsController;
