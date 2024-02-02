import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Tasks: defineTable({
    title: v.string(),
    userId: v.string(),
  }),
});