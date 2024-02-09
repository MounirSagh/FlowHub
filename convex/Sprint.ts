import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createSprint = mutation({
    args: {
        name: v.string(),
        due_at: v.string(),
        projectName: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new Error("You myst be signed in")
        }
        return await ctx.db.insert("Sprint", {
            name: args.name,
            created_by: user.subject,
            due_at: args.due_at,
            projectName: args.projectName,
            
        });
    }
});

export const getSprint = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db.query("Sprint").collect();
    }
});

export const getLastSprint = query({
    args: {projectName:  v.optional(v.string())},
    handler: async (ctx, args) => {
        const allSprints = await ctx.db.query("Sprint").filter((q) => q.eq(q.field("projectName"), args.projectName)).collect();
        const lastSprint = allSprints[allSprints.length - 1];
        return lastSprint;
    }
});