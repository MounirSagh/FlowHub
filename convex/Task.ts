import {v} from 'convex/values'
import {mutation, query} from './_generated/server'

export const createTask = mutation ({
    args: {
        title: v.string(),
        type: v.string(),
        number: v.string(),
        description: v.string(),
        priority: v.string(),
        status: v.string(),
        sprintId: v.id("Sprint")
    },
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new Error("You myst be signed in")
        }
        await ctx.db.insert("Task", {
            title: args.title,
            priority: args.priority,
            description: args.description,
            sprintId: args.sprintId,
            created_by: user.subject,
            status: args.status,
            type: args.type,
            number: args.number,
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
        return await ctx.db.query("Task").filter((q)=>q.eq(q.field("created_by"), user.subject)).collect();
    }
})

export const getAllTasks = query ({
    args: {},
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            return [];
        }
        return await ctx.db.query("Task").collect();
    }
})