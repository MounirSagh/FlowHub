import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Task: defineTable({
    title: v.string(),
    type: v.string(),
    number: v.string(),
    created_by: v.string(),
    priority: v.string(),
    description: v.string(),
    status: v.string(),
    sprintId: v.id("Sprint"),
    projectName: v.string(),
  }),

  Project: defineTable({
    name: v.string(),
    created_by: v.string()
  }),

  Sprint: defineTable({
    name: v.string(),
    due_at: v.string(),
    created_by: v.string(),
    projectName: v.optional(v.string()),
  }),

  Link: defineTable({
    title: v.string(),
    link: v.string(),
    projectName: v.optional(v.string()),
    created_by: v.string()
  }),

});
