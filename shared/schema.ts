import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("player"), // player or kingdom_admin
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

// Players table
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  inGameName: text("in_game_name").notNull(),
  gameId: text("game_id").notNull(),
  power: integer("power").notNull(),
  killPoints: integer("kill_points").notNull(),
  deadTroops: integer("dead_troops").notNull(),
  vipLevel: integer("vip_level").notNull(),
  hasTier5: boolean("has_tier5").notNull().default(false),
  mainTroopType: text("main_troop_type").notNull(),
  playStyle: text("play_style").notNull(),
  languages: text("languages").notNull(),
  profileImageUrl: text("profile_image_url"),
  available: boolean("available").notNull().default(true),
  additionalInfo: text("additional_info"),
});

// Kingdoms table
export const kingdoms = pgTable("kingdoms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  kingdomNumber: text("kingdom_number").notNull().unique(),
  kingdomName: text("kingdom_name").notNull(),
  seed: text("seed").notNull(),
  averagePower: integer("average_power").notNull(),
  kvkSeason: text("kvk_season").notNull(),
  minimumPower: integer("minimum_power").notNull(),
  status: text("status").notNull(), // Active, Recruiting, etc.
  kingdomType: text("kingdom_type").notNull(), // Competitive, Growing, etc.
  languages: text("languages").notNull(),
  bannerImageUrl: text("banner_image_url"),
  description: text("description"),
  requirements: text("requirements"),
});

// Applications table - for tracking player applications to kingdoms
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id").notNull().references(() => players.id),
  kingdomId: integer("kingdom_id").notNull().references(() => kingdoms.id),
  status: text("status").notNull().default("pending"), // pending, accepted, rejected
  message: text("message"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

// Define user relations
export const usersRelations = relations(users, ({ one }) => ({
  player: one(players, {
    fields: [users.id],
    references: [players.userId],
  }),
  kingdom: one(kingdoms, {
    fields: [users.id],
    references: [kingdoms.userId],
  }),
}));

// Define player relations
export const playersRelations = relations(players, ({ one, many }) => ({
  user: one(users, {
    fields: [players.userId],
    references: [users.id],
  }),
  applications: many(applications),
}));

// Define kingdom relations
export const kingdomsRelations = relations(kingdoms, ({ one, many }) => ({
  user: one(users, {
    fields: [kingdoms.userId],
    references: [users.id],
  }),
  applications: many(applications),
}));

// Define application relations
export const applicationsRelations = relations(applications, ({ one }) => ({
  player: one(players, {
    fields: [applications.playerId],
    references: [players.id],
  }),
  kingdom: one(kingdoms, {
    fields: [applications.kingdomId],
    references: [kingdoms.id],
  }),
}));

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
});

export const insertKingdomSchema = createInsertSchema(kingdoms).omit({
  id: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;

export type InsertKingdom = z.infer<typeof insertKingdomSchema>;
export type Kingdom = typeof kingdoms.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;