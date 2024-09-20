function status(request, response) {
  return response
    .status(200)
    .json({ mensagem: "oi isso é a pagina de status" });
}
export default status;
