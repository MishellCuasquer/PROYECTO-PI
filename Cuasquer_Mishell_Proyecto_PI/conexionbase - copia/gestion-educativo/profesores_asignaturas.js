class ListarAsignaturasProfesor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
        :host {
            display: block;
        }
        .container {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 10px;
            overflow: hidden;
        }
        th {
            background-color: #2c3e50; 
            color: white;
            text-align: left;
            padding: 15px;
            font-weight: bold;
        }
        td {
            padding: 15px;
            text-align: left;
            color: #555;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        th, td {
            border: 1px solid #ddd;
        }
        .table-container {
            overflow-x: auto;
        }
    `;
    
    

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        const apiUrl = this.getAttribute('api-url');
        this.fetchData(apiUrl);
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const asignaturas = data || [];
            this.render(asignaturas);
        } catch (error) {
            console.log(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error">Hubo un error al cargar las asignaturas</p>
            `;
        }
    }

    render = (asignaturas) => {
        if (asignaturas.length === 0) {
            this.container.innerHTML = `
                <p class="empty">No hay asignaturas disponibles</p>
            `;
            return;
        }
        let tableHtml = `
        <br>
         <br>
            <h2>Asignaturas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Asignatura</th>
                        <th>ID Profesor</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                    </tr>
                </thead>
                <tbody>
        `;
        asignaturas.forEach(asignatura => {
            tableHtml += `
                <tr>
                    <td>${asignatura.id_asignatura}</td>
                    <td>${asignatura.id_profesor}</td>
                    <td>${asignatura.fecha_inicio}</td>
                    <td>${asignatura.fecha_fin}</td>
                </tr>
            `;
        });
        tableHtml += `
                </tbody>
            </table>
        `;
        this.container.innerHTML = tableHtml;
    }
}

window.customElements.define('listar-asignaturasprofesor', ListarAsignaturasProfesor);
