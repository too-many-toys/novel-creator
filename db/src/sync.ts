import "dotenv/config";
import { syncDb } from "./datasource.js";

async function main() {
  await syncDb(false);
}

main();
