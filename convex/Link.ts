import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createLink = mutation({
    args: {
        link: v.string(),
        projectName: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new Error("You myst be signed in")
        }
        return await ctx.db.insert("Link", {
            link: args.link,
            created_by: user.subject,
            projectName: args.projectName,
            
        });
    }
});

export const getLinkofProject = query({
    args: {projectName:  v.optional(v.string())},
    handler: async (ctx, args) => {
        return await ctx.db.query("Link").filter((q) => q.eq(q.field("projectName"), args.projectName)).collect();
    }
});

