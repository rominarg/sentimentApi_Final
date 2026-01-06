// === DATOS SIMULADOS (Mock Data) ===
const API_URL = "http://127.0.0.1:8000/predict";

async function analizarTexto(texto) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: texto })
        });

        if (!response.ok) {
            throw new Error("Error al analizar texto");
        }

        return await response.json();
    } catch (error) {
        console.error("Error de conexión:", error);
        // Retornamos un valor por defecto si falla para que no rompa el loop
        return { prevision: "Error", probabilidad: 0 };
    }
}

// Esta función es la que llama el botón "Analizar CSV"
async function procesarCSV() {
    const input = document.getElementById("csvFile");

    if (!input.files.length) {
        alert("Seleccioná un archivo CSV");
        return;
    }

    const file = input.files[0];
    const contenido = await file.text();

    const lineas = contenido
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "");

    document.getElementById("tableBody").innerHTML = "";
    document.getElementById("resultsArea").style.display = "block";

    let totalPos = 0;
    let totalNeg = 0;

    // Barra de progreso (opcional, visual)
    console.log(`Analizando ${lineas.length} líneas...`);

    for (const linea of lineas) {
        const resultado = await analizarTexto(linea);

        if (resultado.prevision === "Positivo") totalPos++;
        if (resultado.prevision === "Negativo") totalNeg++;

        agregarFilaTabla(linea, resultado.prevision, resultado.probabilidad);
    }

    document.getElementById("totalPos").innerText = totalPos;
    document.getElementById("totalNeg").innerText = totalNeg;
    document.getElementById("totalTotal").innerText = lineas.length;
}

function agregarFilaTabla(texto, prevision, probabilidad) {
    const tbody = document.getElementById("tableBody");

    const tr = document.createElement("tr");
    
    // Asignar clase de color según la previsión
    let claseColor = "";
    if (prevision === "Positivo") claseColor = "text-success fw-bold";
    else if (prevision === "Negativo") claseColor = "text-danger fw-bold";
    else claseColor = "text-muted";

    tr.innerHTML = `
        <td>${texto}</td>
        <td class="${claseColor}">
            ${prevision}
        </td>
        <td>${(probabilidad * 100).toFixed(2)}%</td>
    `;
    tbody.appendChild(tr);
}

// === DATOS DE EJEMPLO PARA LA PESTAÑA HISTORIAL ===
let historialData = [
    { id: 1, texto: "El servicio fue excelente, me encantó la rapidez.", prevision: 'positivo', probabilidad: 0.98 },
    { id: 2, texto: "No estoy seguro si volvería, fue regular.", prevision: 'neutro', probabilidad: 0.55 },
    { id: 3, texto: "Pésima atención, tardaron horas.", prevision: 'negativo', probabilidad: 0.89 },
    { id: 4, texto: "Muy buena calidad del producto.", prevision: 'positivo', probabilidad: 0.92 }
];

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    renderCharts();
    filtrarHistorial('todos');
    actualizarContadores();
});

// === GENERACIÓN DE GRÁFICOS (Chart.js) ===
function renderCharts() {
    // 1. Gráfico de Torta (Distribución)
    const canvasPie = document.getElementById('pieChart');
    if (canvasPie) {
        const ctxPie = canvasPie.getContext('2d');
        new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: ['Positivos', 'Negativos', 'Neutros'],
                datasets: [{
                    data: [50, 25, 25], 
                    backgroundColor: ['#198754', '#dc3545', '#6c757d'],
                    hoverOffset: 4
                }]
            },
            options: { maintainAspectRatio: false, responsive: true }
        });
    }

    // 2. Gráfico de Línea (Simulando Accuracy)
    const canvasLine = document.getElementById('lineChart');
    if (canvasLine) {
        const ctxLine = canvasLine.getContext('2d');
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5'],
                datasets: [{
                    label: 'Precisión (Accuracy)',
                    data: [0.65, 0.72, 0.81, 0.88, 0.94],
                    borderColor: '#000',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    y: { beginAtZero: false, min: 0.5, max: 1.0 }
                }
            }
        });
    }
}

// === LÓGICA DE LISTADO Y FILTROS ===
function actualizarContadores() {
    const elTodos = document.getElementById('count-todos');
    if(elTodos) elTodos.innerText = historialData.length;

    const elPos = document.getElementById('count-positivo');
    if(elPos) elPos.innerText = historialData.filter(x => x.prevision === 'positivo').length;

    const elNeg = document.getElementById('count-negativo');
    if(elNeg) elNeg.innerText = historialData.filter(x => x.prevision === 'negativo').length;
    
    const elNeu = document.getElementById('count-neutro');
    if(elNeu) elNeu.innerText = historialData.filter(x => x.prevision === 'neutro').length;
}

function filtrarHistorial(filtro) {
    // Gestión visual de botones activos
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    
    const tabId = `tab-${filtro === 'positivo' ? 'positivos' : filtro === 'negativo' ? 'negativos' : filtro === 'neutro' ? 'neutros' : 'todos'}`;
    const activeTab = document.getElementById(tabId);
    if(activeTab) activeTab.classList.add('active');

    const lista = document.getElementById('listaHistorial');
    if (!lista) return; // Si no existe la lista en el HTML actual, salimos
    
    lista.innerHTML = '';

    const datosFiltrados = historialData.filter(item => filtro === 'todos' || item.prevision === filtro);

    if (datosFiltrados.length === 0) {
        lista.innerHTML = '<div class="text-center text-muted py-4">No hay datos.</div>';
        return;
    }

    datosFiltrados.forEach(item => {
        let icono = "bi-circle-fill";
        let colorText = "text-muted";
        
        if(item.prevision === 'positivo') { icono = "bi-hand-thumbs-up-fill"; colorText = "text-success"; }
        else if(item.prevision === 'negativo') { icono = "bi-exclamation-triangle-fill"; colorText = "text-danger"; }
        
        const div = document.createElement('div');
        div.className = `card p-3 mb-2 history-item ${item.prevision}`;
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="fw-bold mb-1 ${colorText}">
                        <i class="bi ${icono} me-1"></i> ${item.prevision.toUpperCase()}
                    </h6>
                    <p class="mb-0 text-muted small">"${item.texto}"</p>
                </div>
                <span class="badge bg-white text-dark border shadow-sm">${Math.round(item.probabilidad * 100)}%</span>
            </div>
        `;
        lista.appendChild(div);
    });
}