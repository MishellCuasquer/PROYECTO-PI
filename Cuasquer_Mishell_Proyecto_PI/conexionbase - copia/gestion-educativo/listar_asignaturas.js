class ListarAsignaturas extends HTMLElement {
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
            <h2>Asignaturas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Horas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        asignaturas.forEach(asignatura => {
            tableHtml += `
                <tr>
                    <td>${asignatura.id_asignatura}</td>
                    <td>${asignatura.nombre}</td>
                    <td>${asignatura.horas}</td>
                    <td>
                        <button class="eliminar-btn" data-id="${asignatura.id_asignatura}">Eliminar</button>
                        <button class="actualizar-btn" data-id="${asignatura.id_asignatura}">Actualizar</button>
                    </td>
                </tr>
            `;
        });
        tableHtml += `
                </tbody>
            </table>
        `;
        this.container.innerHTML = tableHtml;
        this.addEventListeners();
    }

    addEventListeners() {
        this.shadowRoot.querySelectorAll('.eliminar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                this.eliminarAsignatura(id);
            });
        });

        this.shadowRoot.querySelectorAll('.actualizar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                this.actualizarAsignatura(id);
            });
        });
    }

    eliminarAsignatura = async (id_asignatura) => {
        try {
            console.log(`Eliminando asignatura con ID: ${id_asignatura}`);
            const response = await fetch(`http://localhost:8000/asignaturas/${id_asignatura}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Asignatura eliminada correctamente");
                this.fetchData(this.getAttribute('api-url')); 
            } else {
                alert("Error al eliminar la asignatura");
                console.error(`Error al eliminar: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error al eliminar: ${error}`);
        }
    }

    actualizarAsignatura = (id_asignatura) => {
        const nuevoNombre = prompt("Ingrese el nuevo nombre para la asignatura:");
        const nuevasHoras = prompt("Ingrese el nuevo número de horas:");

        if (!nuevoNombre || !nuevasHoras) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const nuevaAsignatura = {
            nombre: nuevoNombre,
            horas: parseInt(nuevasHoras, 10),
        };

        fetch(`http://localhost:8000/asignaturas/${id_asignatura}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaAsignatura),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Asignatura actualizada correctamente");
                    this.fetchData(this.getAttribute('api-url')); 
                } else {
                    alert("Error al actualizar la asignatura");
                    console.error(`Error al actualizar: ${response.statusText}`);
                }
            })
            .catch((error) => {
                console.error(`Error al actualizar: ${error}`);
            });
    }
}

window.customElements.define('listar-asignaturas', ListarAsignaturas);