# Configuración y Ejecución

Python se abre con Visual Studio Code o un editor similar.

## 1. Ubícate en la carpeta del servicio

```bash
cd Backend

## 2. Crea tu entorno virtual

```bash
python -m venv venv

## 3. Activa el entorno virtual

```bash

.\venv\Scripts\actívate

## 4. Instala las dependencias

```bash
pip install -r requirements.txt

## 5. Levanta el microservicio

### Ejecutamos el servidor en el puerto 5000 para evitar conflictos con el backend en Java, que utiliza el puerto 8080 por defecto.

```bash
uvicorn app:app --reload --port 5000

###El microservicio quedará disponible en:

```bash
http://localhost:5000


### ¿Por qué se cambia el puerto?

Spring Boot (backend en Java) incluye un servidor web embebido, generalmente Tomcat, que por defecto escucha en el puerto 8080.

Para evitar conflictos entre ambos servicios:

- **Backend Java (Spring Boot):** puerto 8080
- **Microservicio Python (FastAPI):** puerto 5000

Esto permite que ambos servicios se ejecuten simultáneamente sin interferencias.
