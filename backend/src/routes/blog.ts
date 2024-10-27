import { Hono } from "hono"
import { verify, decode, sign } from "hono/jwt";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@taqi20/blog-common";

export const blogRouter = new Hono<{
    //initialization for ts
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
        params: string
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || '';
    if (!authHeader) {
        c.status(401)
        return c.json({
            error: "unauthorized 1"
        })

    }

    try {
        const payload = await verify(authHeader, c.env.JWT_SECRET)
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized 1" })
        }
        if (typeof payload.id === 'string') {
            c.set('userId', payload.id);
        }
        else {
            c.status(401);
            return c.json({ error: "unauthorized 2" })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "unauthorized 3"
        })
    }
    await next()
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are incorrect"
        })
    }

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })

        return c.json({
            id: post.id
        })
    } catch (err) {
        c.status(500)
        return c.json({
            error: "server error"
        })
    }


    // const body = await c.req.json();
    // const { success } = createBlogInput.safeParse(body);
    // if (!success) {
    //     c.status(411);
    //     return c.json({
    //         message: "Inputs are not correct"
    //     })
    // }

    // const authorId = c.get("userId");

    // try {
    //     const blog = await prisma.blog.create({
    //         data: {
    //             title: body.title,
    //             content: body.content,
    //             authorId: authorId
    //         }
    //     })

    //     return c.json({
    //         id: blog.id,
    //         user_id: authorId
    //     })
    // } catch (e) {
    //     c.status(411);
    //     return c.json({
    //         message: "error"
    //     })
    // }
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        // const blog = await prisma.blog.update({
        //     where: {
        //         id: body.id
        //     },
        //     data: {
        //         title: body.title,
        //         content: body.content
        //     }
        // })

        // return c.json({
        //     id: blog.id
        // })
    } catch (e) {
        c.status(500);
        return c.json({
            message: "Error While puting the blog"
        })
    }
})

//Todo : Add pagination here 
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // const blogs = await prisma.blog.findMany({
    //     select: {
    //         content: true,
    //         title: true,
    //         id: true,
    //         author: {
    //             select: {
    //                 name: true
    //             }
    //         }
    //     }
    // });

    // return c.json({
    //     blogs
    // })


    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return c.json({
            posts
        })
    } catch (error) {
        c.status(500)
        return c.json({
            error: "Not Found Such Post"
        })
    }
})

blogRouter.get('/my', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return c.json({
            posts
        })
    } catch (error) {
        c.status(500)
        return c.json({
            error: "Not Found Such Post"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        // const blog = await prisma.blog.findFirst({
        //     where: {
        //         id: Number(id)
        //     },
        //     select: {
        //         id: true,
        //         title: true,
        //         content: true,
        //         author: {
        //             select: {
        //                 name: true
        //             }
        //         }
        //     }
        // })

        // return c.json({
        //     blog
        // })

        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                },
                comment: {
                    select: {
                        id: true,
                        name: true,
                        content: true,
                        createdAt: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        return c.json(
            post
        )

    } catch (e) {
        c.status(505);
        return c.json({
            message: "Error while fetching blog post "
        })
    }
})

blogRouter.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        await prisma.post.delete({
            where: {
                id,
                authorId: userId
            }
        })
        return c.text('post deleted');
    } catch (error) {
        c.status(500)
        return c.json({
            error: "Server Error"
        })
    }
});

blogRouter.post('/comment/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const comment = await prisma.comment.create({
            data: {
                name: body.name,
                content: body.content,
                post: {
                    connect: { id: id } //connecting to the post by its id 
                }
            }
        })

        return c.json(
            comment
        )
    } catch (error) {
        c.status(500)
        return c.json({
            error: "Internal server error while commenting 1"
        })
    }
})

blogRouter.get('/comment/new/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const comment = await prisma.comment.findMany({
            where: {
                postId: id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return c.json(
            comment
        )
    } catch (error) {
        c.status(500)
        return c.json({
            error: "Internal server error while commenting 2"
        })
    }
})

blogRouter.get('/comment/old/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const comment = await prisma.comment.findMany({
            where: {
                postId: id
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return c.json(
            comment
        )
    } catch (error) {
        c.status(500)
        return c.json({
            error: "Internal server error while commenting 2"
        })
    }
})