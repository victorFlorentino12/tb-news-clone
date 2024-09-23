import database from "../../../../infra/database.js";

async function status(request, response) {
  const query = await database.query("SELECT 1 + 1 as sun");
  console.log(query);
  return response
    .status(200)
    .json({ mensagem: "oi isso é a pagina de status" });
}
export default status;
