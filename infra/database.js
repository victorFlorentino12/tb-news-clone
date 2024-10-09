import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await conectionClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

function getSSL() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
    ? false
    : true;
}

async function conectionClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSL(),
  });
  await client.connect();
  return client;
}

export default {
  query,
  conectionClient,
};
