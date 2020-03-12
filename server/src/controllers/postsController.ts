import { Request, Response, NextFunction } from 'express';
import { Post } from '@src/services/post/post.types';
import { Router } from 'express';
import Container, { Service, Inject } from 'typedi';
import PostService from '@src/services/post';
import { HttpException } from '@src/utils/exceptions';

@Service()
class PostsController {
    public router: Router;

    @Inject()
    postService: PostService;

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
        try {
            const postService = Container.get(PostService);
            const posts = await postService.getPostsAsync();

            res.status(200);
            res.send(posts);
        } catch (e) {
            next(new HttpException(500, e));
        }
    }

    /**
     * GET /posts/:id
     */
    private async getPostAsync(req: Request, res: Response, next: NextFunction) {
        try {
            const postService = Container.get(PostService);
            const post = await postService.getPostAsync(req.params.id);
            if (post) {
                res.status(200);
                res.send(post);
            }

            next(new HttpException(404, 'Post not found'));
        } catch (e) {
            next(e);
        }
    }

    /**
     * POST /posts
     */
    private async addPostAsync(req: Request, res: Response, next: NextFunction) {
        try {
            const post: Post = {
                title: req.body.title,
                tags: req.body.tags,
                image: req.body.image,
            };
            const postService = Container.get(PostService);
            await postService.addPostAsync(post);
            res.status(200);
        } catch (e) {
            next(e);
        }
    }

    /**
     * PUT /posts/:id
     */
    private async updatePostAsync(req: Request, res: Response, next: NextFunction) {
        try {
            const post: Post = {
                id: req.params.id,
                title: req.body.title,
                tags: req.body.tags,
                image: req.body.image,
            };

            const postService = Container.get(PostService);
            await postService.updatePostAsync(post);

            res.status(200);
        } catch (e) {
            next(e);
        }
    }

    /**
     * DELETE /posts/:id
     */
    private async deletePostAsync(req: Request, res: Response, next: NextFunction) {
        try {
            const postService = Container.get(PostService);
            await postService.deletePostAsync(req.params.id);

            res.status(200);
        } catch (e) {
            next(e);
        }
    }
}

export default PostsController;
