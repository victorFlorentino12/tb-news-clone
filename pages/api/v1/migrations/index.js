import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  console.log(request.method);
  const dbClient = await database.conectionClient();
  const optionOfMigrarions = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  try {
    if (request.method === "GET") {
      const migrations = await migrationRunner(optionOfMigrarions);
      await dbClient.end();
      return response.status(200).json(migrations);
    }
    if (request.method === "POST") {
      const migrations = await migrationRunner({
        ...optionOfMigrarions,
        dryRun: false,
      });
      await dbClient.end();
      console.log(migrations.length);
      if (migrations.length > 0) {
        return response.status(201).json(migrations);
      }
      return response.status(200).json(migrations);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.end();
  }
}
