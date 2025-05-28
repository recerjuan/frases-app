// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let frases = [
  { texto: "La única manera de hacer un gran trabajo es amar lo que haces.", autor: "Steve Jobs", categoria: "motivacion" },
  { texto: "No cuentes los días, haz que los días cuenten.", autor: "Muhammad Ali", categoria: "motivacion" },
  { texto: "Cree en ti y todo será posible.", autor: "Anónimo", categoria: "motivacion" },
  { texto: "Sólo sé que no sé nada.", autor: "Sócrates", categoria: "filosofos" },
  { texto: "El hombre es la medida de todas las cosas.", autor: "Protágoras", categoria: "filosofos" },
  { texto: "Pienso, luego existo.", autor: "René Descartes", categoria: "filosofos" },
  { texto: "Todo lo puedo en Cristo que me fortalece.", autor: "Apóstol Pablo", categoria: "religiosas", versiculo: "Filipenses 4:13" },
  { texto: "Dios es nuestro refugio y nuestra fortaleza.", autor: "Rey David", categoria: "religiosas", versiculo: "Salmo 46:1" },
  { texto: "Ama a tu prójimo como a ti mismo.", autor: "Jesús", categoria: "religiosas", versiculo: "Mateo 22:39" },
  { texto: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", autor: "Robert Collier", categoria: "exito" },
  { texto: "El éxito no es el final, el fracaso no es fatal: lo que cuenta es el valor para continuar.", autor: "Winston Churchill", categoria: "exito" },
  { texto: "La disciplina es el puente entre metas y logros.", autor: "Jim Rohn", categoria: "exito" },
];

// Obtener frases (todas o filtradas por categoría)
app.get('/frases', (req, res) => {
  const categoria = req.query.categoria;
  if (categoria) {
    return res.json(frases.filter(f => f.categoria === categoria));
  }
  res.json(frases);
});

// Agregar nueva frase
app.post('/frases', (req, res) => {
  const nueva = req.body;
  if (!nueva.texto || !nueva.autor || !nueva.categoria) {
    return res.status(400).json({ mensaje: "Campos obligatorios faltantes." });
  }
  frases.push(nueva);
  res.status(201).json(nueva);
});

app.listen(PORT, () => {
  console.log(`Servidor backend activo en http://localhost:${PORT}`);
});
