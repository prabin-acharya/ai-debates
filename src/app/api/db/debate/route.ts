import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const debateId = searchParams.get("debateId");
  // const debateId = "N-F6LxSBS7wO5fuXbmVJH";

  const db = getRequestContext().env.DB;

  const { results: debate } = await db
    .prepare("SELECT * FROM Debates WHERE debateId = ?")
    .bind(debateId)
    .all();

  const { results: debateArguments } = await db
    .prepare("SELECT * FROM Arguments WHERE debateId = ?")
    .bind(debateId)
    .all();

  return Response.json({ debate, debateArguments });
}

// save new Debate
export async function POST(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;

  const data: any = await request.json();

  const debateTitle = data.debateTitle;
  const debateDescription = data.debateDescription;

  const db = getRequestContext().env.DB;

  await createDebatesTable(db);

  const newDebateId = nanoid();

  // const { success } = await db
  //   .prepare(`INSERT INTO Debates (debateId, userId, title) VALUES (?, ?, ?)`)
  //   .bind(newDebateId, userId, debateTitle)
  //   .run();

  const { success } = await db
    .prepare(
      `INSERT INTO Debates (debateId, userId, title, description) VALUES (?, ?, ?, ?)`
    )
    .bind(newDebateId, userId, debateTitle, debateDescription)
    .run();

  return Response.json({ success, debateId: newDebateId });
}

async function createDebatesTable(db: any) {
  try {
    await db
      .prepare(
        `
      CREATE TABLE IF NOT EXISTS Debates (
        debateId VARCHAR(20) PRIMARY KEY,
        userId VARCHAR(20),
        title VARCHAR(255),
        description TEXT,
        createdDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
            FOREIGN KEY(userId)
            REFERENCES Users(userId)
            ON DELETE CASCADE
      )
    `
      )
      .run();

    console.log("Debates table created successfully");
  } catch (error) {
    console.error("Error creating Debates table:", error);
  }
}
