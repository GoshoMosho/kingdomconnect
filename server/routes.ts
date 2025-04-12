import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPlayerSchema, 
  insertKingdomSchema, 
  insertApplicationSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all kingdoms
  app.get("/api/kingdoms", async (req, res) => {
    try {
      const kingdoms = await storage.getAllKingdoms();
      res.json(kingdoms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch kingdoms" });
    }
  });

  // Get a specific kingdom
  app.get("/api/kingdoms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid kingdom ID" });
      }
      
      const kingdom = await storage.getKingdomById(id);
      if (!kingdom) {
        return res.status(404).json({ message: "Kingdom not found" });
      }
      
      res.json(kingdom);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch kingdom" });
    }
  });

  // Create a kingdom
  app.post("/api/kingdoms", async (req, res) => {
    try {
      const validatedData = insertKingdomSchema.parse(req.body);
      const kingdom = await storage.createKingdom(validatedData);
      res.status(201).json(kingdom);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid kingdom data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create kingdom" });
    }
  });

  // Get all players
  app.get("/api/players", async (req, res) => {
    try {
      const players = await storage.getAllPlayers();
      res.json(players);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch players" });
    }
  });

  // Get a specific player
  app.get("/api/players/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid player ID" });
      }
      
      const player = await storage.getPlayerById(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch player" });
    }
  });

  // Create a player profile
  app.post("/api/players", async (req, res) => {
    try {
      const validatedData = insertPlayerSchema.parse(req.body);
      const player = await storage.createPlayer(validatedData);
      res.status(201).json(player);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid player data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create player" });
    }
  });

  // User registration
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const user = await storage.createUser(validatedData);
      res.status(201).json({ id: user.id, username: user.username, role: user.role });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Create an application
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid application data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create application" });
    }
  });

  // Get applications for a kingdom
  app.get("/api/kingdoms/:id/applications", async (req, res) => {
    try {
      const kingdomId = parseInt(req.params.id);
      if (isNaN(kingdomId)) {
        return res.status(400).json({ message: "Invalid kingdom ID" });
      }
      
      const applications = await storage.getApplicationsByKingdom(kingdomId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Get applications for a player
  app.get("/api/players/:id/applications", async (req, res) => {
    try {
      const playerId = parseInt(req.params.id);
      if (isNaN(playerId)) {
        return res.status(400).json({ message: "Invalid player ID" });
      }
      
      const applications = await storage.getApplicationsByPlayer(playerId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Update application status
  app.patch("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      
      const { status } = req.body;
      if (!status || !["pending", "accepted", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const application = await storage.updateApplicationStatus(id, status);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Failed to update application" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
