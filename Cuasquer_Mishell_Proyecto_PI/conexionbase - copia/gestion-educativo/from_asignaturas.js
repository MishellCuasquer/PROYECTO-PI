class NuevaAsignatura extends HTMLElement {
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
        this.render();
    }

    render = () => {
        this.container.innerHTML = `
        <center>
            <div class="form-container">
                <h2>Registro de Asignaturas</h2>
                <form id="asignatura-form">
                    <label for="nombre">Nombre de la Asignatura</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="horas">Horas de la Asignatura</label>
                    <input type="text" id="horas" name="horas" required>

                    <button type="submit">Registrar</button>
                    <button type="reset">Limpiar</button>
                </form>
            </div>
        </center>
        `;

        this.shadowRoot.querySelector('#asignatura-form').addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (evento) => {
        evento.preventDefault();
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const horas= this.shadowRoot.querySelector('#horas').value;

        console.log('Nombre:', nombre);
        console.log('Horas:', horas);

        const nuevaAsignatura = {
            nombre,
            horas: horas
        };

        try {
            const response = await fetch('http://localhost:8000/asignaturas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaAsignatura)
            });

            if (response.ok) {
                alert('Asignatura registrada con éxito');
                this.shadowRoot.querySelector('#asignatura-form').reset();
            } else {
                alert('Ocurrió un error al registrar la asignatura');
            }
        } catch (error) {
            console.error(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al registrar la Asignatura</p>
            `;
        }
    };
}

window.customElements.define('nueva-asignatura', NuevaAsignatura);