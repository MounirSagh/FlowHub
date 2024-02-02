import {v} from 'convex/values'
import {mutation, query} from './_generated/server'

export const createTask = mutation ({
    args: {
        title: v.string(),
    },
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new Error("You myst be signed in")
        }
        await ctx.db.insert("Tasks", {
            title: args.title,
            userId: user.subject,
        })
    }
})

export const getTasksofUser = query ({
    args: {},
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            return [];
        }
        return await ctx.db.query("Tasks").filter((q)=>q.eq(q.field("userId"), user.subject)).collect();
    }
})

export const getAllTasks = query ({
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            return [];
        }
        return await ctx.db.query("Tasks").collect();
    }
})