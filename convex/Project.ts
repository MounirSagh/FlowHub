import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createProject = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new Error("You myst be signed in")
        }
        await ctx.db.insert("Project", {
            name: args.name,
            created_by : user.subject
        });
    }
});

export const getProject = query({
    args: {},    
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            return [];
        }
        return await ctx.db.query("Project").filter((q)=>q.eq(q.field("created_by"), user.subject)).collect();
    }
});
