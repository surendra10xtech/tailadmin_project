import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

export const readDB = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    // if file not exist, return default structure
    return { users: [], messages: [] };
  }
};

export const writeDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
};
