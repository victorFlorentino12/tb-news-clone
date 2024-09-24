test("ensure route status it is working properly", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();
  const dataStub = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(dataStub);
});
