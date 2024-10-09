import database from "infra/database";

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public");
}
beforeAll(clearDatabase);

test("ensure migrations return status 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toEqual(201);
  const responseBody = await response1.json();
  console.log(responseBody);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toEqual(200);
  const responseBody2 = await response2.json();
  console.log(responseBody2);
  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0);
});
