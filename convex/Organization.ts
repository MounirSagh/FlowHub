import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createOrganization = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("Organization", {
            name: args.name,
        });        
    }
});






export const getOrganization = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db.query("Organization").collect();
    }
});
