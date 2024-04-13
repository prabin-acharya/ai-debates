import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const userId = request.cookies.get("userId");

  if (userId) {
    return new Response(
      JSON.stringify({ userId, status: "you already have it idiot!" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    const newUserId = nanoid();

    const db = getRequestContext().env.DB;

    const tableExists = await checkIfUsersTableExists(db);

    if (!tableExists) {
      await createUsersTable(db);
    }

    const { success } = await db
      .prepare(`INSERT INTO Users (userId) VALUES (?)`)
      .bind(newUserId)
      .run();

    const response = new Response(
      JSON.stringify({ userId: newUserId, success }),
      {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `userId=${newUserId}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );

    return response;
  }
}

async function checkIfUsersTableExists(db: any) {
  try {
    const { exists } = await db
      .prepare(
        "SELECT EXISTS (SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'Users')"
      )
      .get();

    return exists === 1;
  } catch (error) {
    console.error("Error checking if Users table exists:", error);
    return false;
  }
}

async function createUsersTable(db: any) {
  try {
    await db
      .prepare(
        `
      CREATE TABLE IF NOT EXISTS Users (
        userId VARCHAR(20) PRIMARY KEY,
        createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255)
      )
    `
      )
      .run();

    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating Users table:", error);
  }
}
