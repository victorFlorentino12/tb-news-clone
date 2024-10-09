import database from "infra/database";

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

beforeAll(clearDatabase);

test("ensure migrations return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toEqual(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
