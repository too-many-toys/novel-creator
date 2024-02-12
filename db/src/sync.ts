import "dotenv/config";
import { AppDataSource, dataSourceInit, syncDb } from "./datasource.js";
import * as Entity from "./entities/index.js";

async function main() {
  await syncDb(false);

  await dataSourceInit({ logging: false });
  // await AppDataSource.getRepository(Entity.Novel).clear();
  await AppDataSource.getRepository(Entity.Genre).clear();
  await AppDataSource.getRepository(Entity.Genre).insert([
    {
      genre: "무협",
    },
    {
      genre: "판타지",
    },
    {
      genre: "액션",
    },
    {
      genre: "드라마",
    },
    {
      genre: "학원",
    },
    {
      genre: "로맨스",
    },
    {
      genre: "추리",
    },
    {
      genre: "SF",
    },
  ]);

  console.log(await AppDataSource.getRepository(Entity.Genre).find());

  process.exit(0);
}

main();
