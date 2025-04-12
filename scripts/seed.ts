import { db } from "../server/db";
import { users, players, kingdoms } from "../shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(kingdoms);
  await db.delete(players);
  await db.delete(users);

  console.log("Creating sample users...");

  // Create sample users
  const [user1] = await db
    .insert(users)
    .values({
      username: "kingdom_admin1",
      password: "password123",
      email: "admin1@example.com",
      role: "kingdom_admin",
      createdAt: new Date().toISOString(),
    })
    .returning();

  const [user2] = await db
    .insert(users)
    .values({
      username: "kingdom_admin2",
      password: "password123",
      email: "admin2@example.com",
      role: "kingdom_admin",
      createdAt: new Date().toISOString(),
    })
    .returning();

  const [user3] = await db
    .insert(users)
    .values({
      username: "kingdom_admin3",
      password: "password123",
      email: "admin3@example.com",
      role: "kingdom_admin",
      createdAt: new Date().toISOString(),
    })
    .returning();

  const [player1User] = await db
    .insert(users)
    .values({
      username: "player1",
      password: "password123",
      email: "player1@example.com",
      role: "player",
      createdAt: new Date().toISOString(),
    })
    .returning();

  const [player2User] = await db
    .insert(users)
    .values({
      username: "player2",
      password: "password123",
      email: "player2@example.com",
      role: "player",
      createdAt: new Date().toISOString(),
    })
    .returning();

  const [player3User] = await db
    .insert(users)
    .values({
      username: "player3",
      password: "password123",
      email: "player3@example.com",
      role: "player",
      createdAt: new Date().toISOString(),
    })
    .returning();

  console.log("Creating sample kingdoms...");

  // Create sample kingdoms
  await db.insert(kingdoms).values({
    userId: user1.id,
    kingdomNumber: "1912",
    kingdomName: "Imperium Dynasty",
    seed: "A",
    averagePower: 65000000,
    kvkSeason: "Season 3",
    minimumPower: 45000000,
    status: "Active",
    kingdomType: "Competitive",
    languages: "English",
    bannerImageUrl: "https://images.unsplash.com/photo-1499343162160-cd1441923dd3",
    description: "A highly competitive kingdom looking for active fighters for KVK",
    requirements: "45M power, T5 troops, high activity during KVK",
  });

  await db.insert(kingdoms).values({
    userId: user2.id,
    kingdomNumber: "2546",
    kingdomName: "Phoenix Rising",
    seed: "B",
    averagePower: 40000000,
    kvkSeason: "Season 2",
    minimumPower: 25000000,
    status: "Recruiting",
    kingdomType: "Growing",
    languages: "International",
    bannerImageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    description: "A growing kingdom looking for active members",
    requirements: "25M power, willing to participate in kingdom events",
  });

  await db.insert(kingdoms).values({
    userId: user3.id,
    kingdomNumber: "1075",
    kingdomName: "Valhalla Warriors",
    seed: "A",
    averagePower: 80000000,
    kvkSeason: "Season 4",
    minimumPower: 60000000,
    status: "Competitive",
    kingdomType: "High Activity",
    languages: "English",
    bannerImageUrl: "https://images.unsplash.com/photo-1569701813229-33284b643e3c",
    description: "Elite kingdom seeking highly active fighters",
    requirements: "60M power, T5 troops, high kill counts",
  });

  console.log("Creating sample players...");

  // Create sample players
  await db.insert(players).values({
    userId: player1User.id,
    inGameName: "AthenaWarrior",
    gameId: "19384756",
    power: 78500000,
    killPoints: 1200000000,
    deadTroops: 3700000,
    vipLevel: 16,
    hasTier5: true,
    mainTroopType: "Infantry",
    playStyle: "Rally Leader",
    languages: "English",
    profileImageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    available: true,
    additionalInfo: "Looking for a competitive kingdom for KVK",
  });

  await db.insert(players).values({
    userId: player2User.id,
    inGameName: "DragonSlayer",
    gameId: "82756431",
    power: 65200000,
    killPoints: 875000000,
    deadTroops: 2100000,
    vipLevel: 15,
    hasTier5: true,
    mainTroopType: "Cavalry",
    playStyle: "Field Fighter",
    languages: "English/Spanish",
    profileImageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    available: true,
    additionalInfo: "Active daily, ready to migrate to a new kingdom",
  });

  await db.insert(players).values({
    userId: player3User.id,
    inGameName: "ArcherQueen",
    gameId: "54129876",
    power: 52800000,
    killPoints: 625000000,
    deadTroops: 1800000,
    vipLevel: 14,
    hasTier5: true,
    mainTroopType: "Archer",
    playStyle: "Support",
    languages: "English",
    profileImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    available: true,
    additionalInfo: "Specialist in archer armies and support roles",
  });

  console.log("Database seeded successfully!");
}

seed()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });