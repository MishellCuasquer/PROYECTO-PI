class ListarProfesores extends HTMLElement {
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
            const profesores = data || [];
            this.render(profesores);
        } catch (error) {
            console.log(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error">Hubo un error al cargar los profesores</p>
            `;
        }
    }

    render = (profesores) => {
        if (profesores.length === 0) {
            this.container.innerHTML = `
                <p class="empty">No hay profesores disponibles</p>
            `;
            return;
        }
        let tableHtml = `
            <h2>Profesores</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre y Apellido</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                        
                    </tr>
                </thead>
                <tbody>
        `;
        profesores.forEach(profesor => {
            tableHtml += `
                <tr>
                    <td>${profesor.id_profesor}</td>
                    <td>${profesor.nombre}</td>
                    <td>${profesor.especialidad}</td>
                    <td>
                        <button class="eliminar-btn" data-id="${profesor.id_profesor}">Eliminar</button>
                       
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
                this.eliminarProfesor(id);
            });
        });

     
            
    }

    eliminarProfesor = async (id_profesor) => {
        try {
            console.log(`Eliminando profesor con ID: ${id_profesor}`);
            const response = await fetch(`http://localhost:8000/profesores/${id_profesor}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Profesor eliminado correctamente");
                this.fetchData(this.getAttribute('api-url')); 
            } else {
                alert("Error al eliminar el profesor");
                console.error(`Error al eliminar: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error al eliminar: ${error}`);
        }
    }
      
}

window.customElements.define('listar-profesores', ListarProfesores);