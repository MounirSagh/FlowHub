import {v} from 'convex/values'
import {mutation, query} from './_generated/server'


// Number of sprints created by project
export const getSprintsByProject = query({
    args: { projectName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const sprintnum = await ctx.db.query("Sprint").filter((q) => q.eq(q.field("projectName"), args.projectName)).collect();
        return sprintnum.length
    }
});

// Number of tasks created by project
export const getTasksByProject = query({
    args: { projectName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const sprintnum = await ctx.db.query("Task").filter((q) => q.eq(q.field("projectName"), args.projectName)).collect();
        return sprintnum.length
    }
});

// Task completion rate by project
export const getTaskCompletionRateByProject = query({
    args: { projectName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const totalTasks = (await ctx.db.query("Task").filter((q) => q.eq(q.field("projectName"), args.projectName)).collect());
        const completedTasks = (await ctx.db.query("Task").filter((q) => q.eq(q.field("projectName"), args.projectName)).filter((q) => q.eq(q.field("status"), "done")).collect());
        if (completedTasks.length === 0) return 0;
        const completionRate = (completedTasks.length / totalTasks.length) * 100;
        return Math.round(completionRate);
    }
});

// last five sprints by project
export const getLastFiveSprints = query({
    args: { projectName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const sprints = await ctx.db.query("Sprint").filter((q) => q.eq(q.field("projectName"), args.projectName)).order("desc").take(5);
        return sprints;
    }
});

// last ten tasks by project
export const getLastTenTasks = query({
    args: { projectName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const sprints = await ctx.db.query("Task").filter((q) => q.eq(q.field("projectName"), args.projectName)).order("desc").take(5);
        return sprints;
    }
});


//Distribution of tasks by type:
export const getTasksByTypeDistribution = query({
    args: { projectName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const tasks = await ctx.db.query("Task").filter((q) => q.eq(q.field("projectName"), args.projectName)).collect();
        const distribution : any= {};

        tasks.forEach(task => {
            if (distribution[task.type]) {
                distribution[task.type]++;
            } else {
                distribution[task.type] = 1;
            }
        });

        return distribution;
    }
});

//Distribution of tasks by priority:
export const getTasksByPriorityDistribution = query({
    args: { projectName: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const tasks = await ctx.db.query("Task").filter((q) => q.eq(q.field("projectName"), args.projectName)).collect();
        const distribution: any = {};

        tasks.forEach(task => {
            if (distribution[task.priority]) {
                distribution[task.priority]++;
            } else {
                distribution[task.priority] = 1;
            }
        });

        return distribution;
    }
});


