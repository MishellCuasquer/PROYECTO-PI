// Cabecera 
class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const container = document.createElement("header");
    container.textContent = "Universidad de las Fuerzas Armadas ESPE";

    const estilo = document.createElement("style");
    estilo.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  header {
    font-size: 22px;
    text-align: center;
    padding: 15px 0;
    background: linear-gradient(to right, #2c3e50, #34495e); 
    color: #ecf0f1;  /* Blanco suave */
    width: 100%;
    border-bottom: 3px solid #16a085; 
    text-transform: uppercase;
    letter-spacing: 2px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); 
  }
  header::after {
    content: "";
    display: block;
    margin: 10px auto 0;
    width: 50px;
    height: 3px;
   
  }
`;


    this.shadowRoot.appendChild(estilo);
    this.shadowRoot.appendChild(container);
  }
}

window.customElements.define("mi-header", Header);

//  Menu
class Menu extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    container.classList.add("menu-container");

    const opciones = [
      { item: "Inicio", link: "inicio.html" },
      { item: "Profesores", link: "profesores.html" },
      { item: "Asignaturas", link: "asignaturas2.html" },
      { item: "Profesores - Asignaturas ", link: "profesores_asignaturas.html" },
    ];

    const lista = document.createElement("ul");
    lista.classList.add("menu-list");

    opciones.forEach(op => {
      const itemList = document.createElement("li");
      itemList.classList.add("menu-item");
      const enlace = document.createElement("a");
      enlace.textContent = op.item;
      enlace.href = op.link;
      enlace.classList.add("menu-link");
      itemList.appendChild(enlace);
      lista.appendChild(itemList);
    });

    container.appendChild(lista);

    const estilo = document.createElement("style");
    estilo.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .menu-container {
    display: flex;
    justify-content: center;
    background-color: #2c3e50;
    padding: 10px 0;
    width: 100%;
    border-bottom: 2px solid #16a085;
  }
  .menu-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
    list-style: none;
  }
  .menu-item {
    flex: 1;
    text-align: center;
  }
  .menu-link {
    text-decoration: none;
    color: #ecf0f1;
    font-weight: bold;
    display: block;
    padding: 10px;
    transition: background-color 0.3s, color 0.3s;
  }
  .menu-link:hover {
    background-color: #16a085;
    color: #ffffff;
    border-radius: 5px;
  }
`;

    shadow.appendChild(container);
    shadow.appendChild(estilo);
  }
}

window.customElements.define("mi-menu", Menu);


// Footer
class Footer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const container = document.createElement("footer");
    container.textContent = "Todos los derechos reservados @espe.edu.ec";

    const estilo = document.createElement("style");
    estilo.textContent = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        footer {
          font-family: Arial, sans-serif;
          font-size: 14px;
          text-align: center;
          padding: 10px;
          background-color: #333;
          color: white;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }
      `;

    this.shadowRoot.appendChild(estilo);
    this.shadowRoot.appendChild(container);
  }
}

window.customElements.define("mi-footer", Footer);
