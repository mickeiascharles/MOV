import app from "./app.js";
import "./db.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
