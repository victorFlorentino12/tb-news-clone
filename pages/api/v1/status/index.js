import database from "infra/database";

async function status(request, response) {
  const databaseVersion = await database.query("SELECT version();");
  const databaseVersionShort = databaseVersion.rows[0].version.slice(0, 15);

  const databaseMaxConnection = await database.query("SHOW max_connections;");
  const databaseMaxConnectionNumber = Number(
    databaseMaxConnection.rows[0].max_connections,
  );
  const databaseName = process.env.POSTGRES_DB;
  console.log(databaseName);
  const databaseUseConection = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const databaseUseConectionNumber = parseInt(
    databaseUseConection.rows[0].count,
  );
  console.log(databaseUseConection.rows[0].count);
  const updateAt = new Date().toISOString();
  return response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionShort,
        max_connection: databaseMaxConnectionNumber,
        used_connection: databaseUseConectionNumber,
      },
    },
  });
}
export default status;
