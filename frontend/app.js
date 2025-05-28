let categoriaActual = "motivacion";

async function renderFrases() {
  const contenedor = document.getElementById("frases");
  contenedor.innerHTML = "";

  const res = await fetch(`http://localhost:3000/frases?categoria=${categoriaActual}`);
  const frases = await res.json();

  if (frases.length === 0) {
    contenedor.innerHTML = "<p>No hay frases en esta categoría aún.</p>";
    return;
  }

  frases.forEach(f => {
    const div = document.createElement("div");
    div.className = "frase";
    let contenido = `<p>"${f.texto}"<br><strong>- ${f.autor}</strong>`;
    if (f.categoria === "religiosas" && f.versiculo) {
      contenido += `<br><em>${f.versiculo}</em>`;
    }
    contenido += "</p>";
    div.innerHTML = contenido;
    contenedor.appendChild(div);
  });
}

function mostrarCategoria(categoria) {
  categoriaActual = categoria;
  renderFrases();
}

document.addEventListener("DOMContentLoaded", function () {
  renderFrases();

  document.getElementById("formulario-frase").addEventListener("submit", async function (e) {
    e.preventDefault();
    const autor = document.getElementById("autor").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const categoria = document.getElementById("categoria").value;
    let versiculo = null;

    if (categoria === "religiosas") {
      versiculo = prompt("Introduce el versículo bíblico:");
    }

    if (autor && texto && categoria) {
      const nuevaFrase = { texto, autor, categoria };
      if (versiculo) nuevaFrase.versiculo = versiculo;

      await fetch("http://localhost:3000/frases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaFrase),
      });

      renderFrases();
      this.reset();
    }
  });
});

  
  