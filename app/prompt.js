function customPrompt(mensagem) {
  return new Promise((resolve) => {
    const estiloHover = document.createElement("style");
    estiloHover.textContent = `
  .btnOk:hover {
    background-color:rgb(56, 168, 84)!important;
    cursor: pointer !important;
    transition: background-color 0.3s ease !important;
  }

  .btnCancelar:hover {
    background-color:rgb(212, 62, 62) !important;
    cursor: pointer !important;
    transition: background-color 0.3 ease !important;
  }
`;
    document.head.appendChild(estiloHover);

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.background = "rgba(0,0,0,0.6)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = 9999;

    const box = document.createElement("div");
    box.style.background = "rgb(18,52,86)";
    box.style.padding = "20px";
    box.style.borderRadius = "10px";
    box.style.boxShadow = "0 0 10px #0008";
    box.style.minWidth = "20%";
    box.style.fontFamily = "Montserrat";
    box.style.fontSize = "20px";
    box.style.color = "white";
    box.style.textAlign = "center";

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    const input = document.createElement("textarea");
    input.type = "text";
    input.style.width = "100%";
    input.style.marginTop = "10px";
    input.style.padding = "15px";
    input.placeholder = "Insira o nome da tarefa...";
    input.style.textAlign = "center";

    const botoes = document.createElement("div");
    botoes.style.marginTop = "15px";
    botoes.style.textAlign = "center"

    const btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    btnOk.style.marginRight = "10px";
    btnOk.style.background = "green";
    btnOk.style.borderRadius = "5px";
    btnOk.style.padding = "5px 15px";
    btnOk.classList.add("btnOk");

    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.style.background = "rgb(150, 48, 48)";
    btnCancelar.style.borderRadius = "5px";
    btnCancelar.style.padding = "5px 15px";
    btnCancelar.classList.add("btnCancelar");

    btnOk.onclick = () => {
      document.body.removeChild(overlay);
      resolve(input.value);
    };

    btnCancelar.onclick = () => {
      document.body.removeChild(overlay);
      resolve(null);
    };

    botoes.appendChild(btnOk);
    botoes.appendChild(btnCancelar);
    box.appendChild(texto);
    box.appendChild(input);
    box.appendChild(botoes);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    input.focus();

    document.addEventListener("keydown", function escListener(e) {
      if (e.key === "Escape") {
        document.body.removeChild(overlay);
        document.removeEventListener("keydown", escListener);
        resolve(null);
      }
    });
  });
}
