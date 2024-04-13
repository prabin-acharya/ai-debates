import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const db = getRequestContext().env.DB;

  const { results } = await db.prepare("SELECT * FROM Arguments").all();

  return Response.json(results);
}

export async function POST(request: NextRequest) {
  const data: any = await request.json();
  const debateId = data.debateId;
  const agentName = data.agentName;
  const argument = data.argument;

  const db = getRequestContext().env.DB;

  await createUsersTable(db);

  const { success } = await db
    .prepare(
      `INSERT INTO Arguments (debateId, agentName, argument) VALUES (?, ?, ?)`
    )
    .bind(debateId, agentName, argument)
    .run();

  return Response.json({ success });
}

async function createUsersTable(db: any) {
  try {
    await db
      .prepare(
        `
      CREATE TABLE IF NOT EXISTS Arguments (
        argumentId SERIAL PRIMARY KEY,
        debateId INT NOT NULL,
        agentName VARCHAR(255),
        argument TEXT NOT NULL,
        createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_debate
            FOREIGN KEY(debateId)
            REFERENCES Debates(debateId)
            ON DELETE CASCADE
      )
    `
      )
      .run();

    console.log("Arguments table created successfully");
  } catch (error) {
    console.error("Error creating Arguments table:", error);
  }
}
