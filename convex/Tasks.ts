import {v} from 'convex/values'
import {mutation, query} from './_generated/server'

export const createTask = mutation ({
    args: {
        title: v.string(),
        description: v.string(),
        assigned_to: v.id("User"),
        priority: v.string(),
        due_at: v.string(),
        sprintId: v.id("Sprint")
    },
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new Error("You myst be signed in")
        }
        await ctx.db.insert("Tasks", {
            title: args.title,
            priority: args.priority,
            description: args.description,
            assigned_to: args.assigned_to,
            sprintId: args.sprintId,
            due_at: args.priority,
            created_by: user.subject,
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
        return await ctx.db.query("Tasks").filter((q)=>q.eq(q.field("assigned_to"), user.subject)).collect();
    }
})

export const getAllTasks = query ({
    args: {},
    handler: async(ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            return [];
        }
        return await ctx.db.query("Tasks").collect();
    }
})