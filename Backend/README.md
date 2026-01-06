# API de Predicción de Sentimiento
FastApi

# Instalar dependencias:
pip install joblib scikit-learn fastapi uvicorn

# Inicia la aplicación:
uvicorn app:app --reload

# Consumo de API de Sentimiento – Postman

## URL
http://localhost:8000/predict

---

### 🛠️ Configuración de VS Code (Solución de errores de importación)

Si al abrir los archivos de Python ves líneas amarillas o errores como *"Import could not be resolved"*, sigue estos 3 pasos para decirle a VS Code que use tu entorno virtual:

1.  **Abre el menú de comandos:**
    Presiona las teclas `Ctrl` + `Shift` + `P` al mismo tiempo.

2.  **Busca el selector de intérprete:**
    Escribe `Python: Select Interpreter` y presiona **Enter**.

3.  **Elige la opción correcta:**
    Te aparecerá una lista. Debes buscar y seleccionar la que diga algo como:
    * `Python 3.x.x ('venv': venv)`
    * O que tenga la ruta `./Backend/venv/bin/python` (o `Scripts/python` en Windows).
    * *Nota: Suele tener una estrella o decir "Recommended".*


## Método
POST

---

## Headers
| Key | Value |
|---|---|
| Content-Type | application/json |

---

## Body (raw → JSON)
```json
{
  "text": "esta película es fea, la peor que he visto en años"
}
```
## Respuesta
```json
{
    "prevision": "Negativo",
    "probabilidad": 0.9825
}
```
