test("ensure route status it is working properly", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const responseBodyDependeciesDb = responseBody.dependencies.database;

  expect(responseBody).toBeDefined();
  expect(responseBody.update_at).toBeDefined();

  expect(responseBodyDependeciesDb.version).toBeDefined();
  expect(responseBodyDependeciesDb.max_connection).toBeDefined();
  expect(responseBodyDependeciesDb.used_connection).toBeDefined();

  expect(responseBody.update_at).toEqual(responseBody.update_at);
  expect(responseBodyDependeciesDb.version).toEqual("PostgreSQL 16.4");
  expect(responseBodyDependeciesDb.max_connection).toEqual(100);
  expect(responseBodyDependeciesDb.used_connection).toEqual(1);

  const dataStub = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(dataStub);
  console.log(responseBody);
});
