import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono"
import { verify, decode, sign } from "hono/jwt";
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
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id as string)  //check all the endpoints again on postman after succesfully migration of schema and remove "as string" 
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "you are not logged in "
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "you are not logged in "
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }

    const authorId = c.get("userId");

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })

        return c.json({
            id: blog.id,
            user_id: authorId
        })
    } catch (e) {
        c.status(411);
        return c.json({
            message: "error"
        })
    }
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        message: "Inputs are not correct"
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(411);
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

    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch (e) {
        c.status(404);
        return c.json({
            message: "Error while fetching blog post "
        })
    }
})

blogRouter.delete("/delete/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const authHeader = c.req.header('Authorization') || '';

    if (!authHeader) {
        return c.json({
            msg: "Auth token is missing"
        });
    }

    let user;

    try {
        const decoded = await verify(authHeader, c.env.JWT_SECRET);

        user = decoded.id;

    } catch (error) {
        return c.json({
            msg: "Invalid or expired token"
        })
    }

    const postId = c.req.param("id");
    try {
        //retrieve post to check if the user can delete it 
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) {
            return c.json({
                msg: "Post Not Found"
            });
        }

        if (post.authorId !== user) {
            return c.json({
                msg: "User is not authorized to delete this post"
            });
        }

        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return c.json({
            message: "Successfully deleted blog"
        })
    } catch (error) {
        console.log(error);
        return c.json({
            msg: "Failed to delete post"
        });
    }
});