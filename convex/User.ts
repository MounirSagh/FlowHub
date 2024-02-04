import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        organizationId: v.id("Organization")
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("User", {
            name: args.name,
            email: args.email,
            organizationId: args.organizationId,
        });
    }
});

export const getUser = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db.query("User").collect();
    }
});
