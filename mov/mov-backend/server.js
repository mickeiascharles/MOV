import app from "./app.js";
import "./db.js";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(` Servidor backend rodando em http://localhost:${PORT}`);
});
