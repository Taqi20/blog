import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@taqi20/blog-common";

export const userRouter = new Hono<{
    //initialization for ts
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) //this part is important 

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.text(token)
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})


userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) //this part is important 

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!user) {
            c.status(403);
            return c.json({ message: "Incorrect credentials" });
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.text(token)
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing in" });
    }
})