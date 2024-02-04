import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Tasks: defineTable({
    title: v.string(),
    created_by: v.string(),
    priority: v.string(),
    description: v.string(),
    due_at: v.string(),
    assigned_to: v.id("User"),
    sprintId: v.id("Sprint")
  }),

  Organization: defineTable({
    name: v.string(),
  }),

  Project: defineTable({
    name: v.string(),
    organizationId: v.id("Organization"),
    created_by: v.string()
  }),

  User: defineTable({
    name: v.string(),
    email: v.string(),
    organizationId: v.id("Organization")
  }),

  Sprint: defineTable({
    name: v.string(),
    due_at: v.string(),
    created_by: v.string(),
  }),

});
