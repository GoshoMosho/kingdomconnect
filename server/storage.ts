import { 
  users, 
  players, 
  kingdoms, 
  applications, 
  type User, 
  type InsertUser, 
  type Player, 
  type InsertPlayer, 
  type Kingdom, 
  type InsertKingdom, 
  type Application, 
  type InsertApplication 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Player operations
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(id: number): Promise<Player | undefined>;
  getPlayerByUserId(userId: number): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: number, player: Partial<InsertPlayer>): Promise<Player | undefined>;

  // Kingdom operations
  getAllKingdoms(): Promise<Kingdom[]>;
  getKingdomById(id: number): Promise<Kingdom | undefined>;
  getKingdomByUserId(userId: number): Promise<Kingdom | undefined>;
  createKingdom(kingdom: InsertKingdom): Promise<Kingdom>;
  updateKingdom(id: number, kingdom: Partial<InsertKingdom>): Promise<Kingdom | undefined>;

  // Application operations
  createApplication(application: InsertApplication): Promise<Application>;
  getApplicationById(id: number): Promise<Application | undefined>;
  getApplicationsByPlayer(playerId: number): Promise<Application[]>;
  getApplicationsByKingdom(kingdomId: number): Promise<Application[]>;
  updateApplicationStatus(id: number, status: string): Promise<Application | undefined>;
}

// DatabaseStorage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return user;
  }
  
  async getAllPlayers(): Promise<Player[]> {
    return db.select().from(players);
  }

  async getPlayerById(id: number): Promise<Player | undefined> {
    const [player] = await db.select().from(players).where(eq(players.id, id));
    return player || undefined;
  }

  async getPlayerByUserId(userId: number): Promise<Player | undefined> {
    const [player] = await db.select().from(players).where(eq(players.userId, userId));
    return player || undefined;
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const [player] = await db
      .insert(players)
      .values(insertPlayer)
      .returning();
    return player;
  }

  async updatePlayer(id: number, playerUpdate: Partial<InsertPlayer>): Promise<Player | undefined> {
    const [player] = await db
      .update(players)
      .set(playerUpdate)
      .where(eq(players.id, id))
      .returning();
    return player;
  }

  async getAllKingdoms(): Promise<Kingdom[]> {
    return db.select().from(kingdoms);
  }

  async getKingdomById(id: number): Promise<Kingdom | undefined> {
    const [kingdom] = await db.select().from(kingdoms).where(eq(kingdoms.id, id));
    return kingdom || undefined;
  }

  async getKingdomByUserId(userId: number): Promise<Kingdom | undefined> {
    const [kingdom] = await db.select().from(kingdoms).where(eq(kingdoms.userId, userId));
    return kingdom || undefined;
  }

  async createKingdom(insertKingdom: InsertKingdom): Promise<Kingdom> {
    const [kingdom] = await db
      .insert(kingdoms)
      .values(insertKingdom)
      .returning();
    return kingdom;
  }

  async updateKingdom(id: number, kingdomUpdate: Partial<InsertKingdom>): Promise<Kingdom | undefined> {
    const [kingdom] = await db
      .update(kingdoms)
      .set(kingdomUpdate)
      .where(eq(kingdoms.id, id))
      .returning();
    return kingdom;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db
      .insert(applications)
      .values({
        ...insertApplication,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return application;
  }

  async getApplicationById(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application || undefined;
  }

  async getApplicationsByPlayer(playerId: number): Promise<Application[]> {
    return db.select().from(applications).where(eq(applications.playerId, playerId));
  }

  async getApplicationsByKingdom(kingdomId: number): Promise<Application[]> {
    return db.select().from(applications).where(eq(applications.kingdomId, kingdomId));
  }

  async updateApplicationStatus(id: number, status: string): Promise<Application | undefined> {
    const [application] = await db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }
}

// Initialize the storage with database implementation
export const storage = new DatabaseStorage();