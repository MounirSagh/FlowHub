// import {v} from 'convex/values'
// import { mutation } from "./_generated/server";

// export const createUser = mutation({
//   args: {
//     userId: v.string(),
//     name: v.string(),
//     email: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     const { tokenIdentifier, name, email } : any = identity;
//     await ctx.db.insert("Users", {
//         userId: args.userId,
//         name: args.name,
//         email: args.email,
//     })
//   },
// });