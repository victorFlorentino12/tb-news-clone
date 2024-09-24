import database from "infra/database";

async function status(request, response) {
  const databaseVersion = await database.query("SELECT version()");
  const databaseVersionShort = databaseVersion.rows[0].version.slice(0, 14);

  const databaseMaxConnection = await database.query("SHOW max_connections");
  const databaseMaxConnectionNumber = Number(
    databaseMaxConnection.rows[0].max_connections,
  );

  const databaseUseConection = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity",
  );
  const databaseUseConectionNumber = Number(databaseUseConection.rows[0].count);

  const updateAt = new Date().toISOString();
  return response.status(200).json({
    update_at: updateAt,
    version: databaseVersionShort,
    max_connection: databaseMaxConnectionNumber,
    used_connection: databaseUseConectionNumber,
  });
}
export default status;
