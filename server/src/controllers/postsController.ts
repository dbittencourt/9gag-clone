import { Request, Response } from 'express';

export class PostsController {
    /**
     * GET /posts
     * @param req request
     * @param res response
     */
    public getPosts(req: Request, res: Response) {
        res.render('post', {
            title: 'post',
            tags: ['tag1', 'tag2'],
            picture: 'picture',
        });
    }

    /**
     * GET /posts/:id
     */
    public getPost = (req: Request, res: Response) => {
        res.render('post', {
            title: 'post',
            tags: ['tag1', 'tag2'],
            picture: 'picture',
        });
    };

    /**
     * POST /posts
     */
    public postPost = (req: Request, res: Response) => {
        throw new Error('not implemented');
    };

    /**
     * PUT /posts/:id
     */
    public updatePost = (req: Request, res: Response) => {
        throw new Error('not implemented');
    };

    /**
     * DELETE /posts/:id
     */
    public deletePost = (req: Request, res: Response) => {
        throw new Error('not implemented');
    };
}
