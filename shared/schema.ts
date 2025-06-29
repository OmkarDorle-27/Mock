import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Mock Test schemas
export const mockTests = pgTable("mock_tests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subjects: text("subjects").array().notNull(),
  questions: jsonb("questions").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const testAttempts = pgTable("test_attempts", {
  id: serial("id").primaryKey(),
  testId: integer("test_id").references(() => mockTests.id),
  userId: integer("user_id").references(() => users.id),
  answers: jsonb("answers").notNull(),
  markedForReview: jsonb("marked_for_review").notNull(),
  score: integer("score"),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent"),
});

export const insertMockTestSchema = createInsertSchema(mockTests).omit({
  id: true,
  createdAt: true,
});

export const insertTestAttemptSchema = createInsertSchema(testAttempts).omit({
  id: true,
});

export type MockTest = typeof mockTests.$inferSelect;
export type TestAttempt = typeof testAttempts.$inferSelect;
export type InsertMockTest = z.infer<typeof insertMockTestSchema>;
export type InsertTestAttempt = z.infer<typeof insertTestAttemptSchema>;

// Question type definitions
export const questionSchema = z.object({
  id: z.number(),
  number: z.number(),
  subject: z.enum(['physics', 'chemistry', 'maths']),
  type: z.enum(['mcq', 'numerical', 'multi-correct']),
  text: z.string(),
  options: z.record(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.number(), z.array(z.string())]),
  marks: z.number().default(4),
  negativeMark: z.number().default(-1),
});

export type Question = z.infer<typeof questionSchema>;
