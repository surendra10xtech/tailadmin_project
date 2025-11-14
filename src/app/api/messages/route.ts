import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.messages);
}

export async function POST(req: Request) {
  const body = await req.json(); 
  const db = readDB();

  // generate id
  const nextId = db.messages.length ? Math.max(...db.messages.map((m: any) => m.id)) + 1 : 1;
  const newMsg = {
    id: nextId,
    ...body,
    timestamp: new Date().toISOString(),
  };

  db.messages.push(newMsg);
  writeDB(db);

  return NextResponse.json(newMsg, { status: 201 });
}
