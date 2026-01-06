
<img width="719" height="354" alt="apiSentiment" src="https://github.com/user-attachments/assets/ef4f8a47-6635-4133-92f4-8234e80776ac" />


# Microservicio de Data Science (Python)

Este componente es el encargado de alojar la **inteligencia del sistema**.  
Funciona como una **API independiente (Microservicio)** construida con **FastAPI** que expone el modelo entrenado.

**Nota de Arquitectura:**  
Este servicio **no es el backend principal**. Su única función es **recibir texto del Backend de Java**, procesarlo y **devolver la predicción de sentimiento**.

---

## Configuración y Ejecución 


Este microservicio está desarrollado en Python utilizando FastAPI. Se recomienda abrir el proyecto con Visual Studio Code o un editor similar.


# Configuración y Ejecución

Python se abre con Visual Studio Code o un editor similar.

## 1. Ubícate en la carpeta del servicio

```
cd Backend
```

## 2. Crea tu entorno virtual

```
python -m venv venv

```

## 3. Activa el entorno virtual

```
.\venv\Scripts\actívate
```

## 4. Instala las dependencias

```
pip install -r requirements.txt
```

## 5. Levanta el microservicio

### Ejecutamos el servidor en el puerto 5000 para evitar conflictos con el backend en Java, que utiliza el puerto 8080 por defecto.

```
uvicorn app:app --reload --port 5000
```

###El microservicio quedará disponible en:

```http://localhost:5000```


### ¡Recordar! Cuando dejamos de usar el sistema:

1. Para cerrarlo presiona: **CTRL + C**
2. Escribe en la terminal para desactivar el entorno:

```deactivate```


### ¿Por qué se cambia el puerto?

Spring Boot (backend en Java) incluye un servidor web embebido, generalmente Tomcat, que por defecto escucha en el puerto 8080.

Para evitar conflictos entre ambos servicios:

- **Backend Java (Spring Boot):** puerto 8080
- **Microservicio Python (FastAPI):** puerto 5000

Esto permite que ambos servicios se ejecuten simultáneamente sin interferencias.
____________________________________________________________________________

# Backend Principal (Java Spring Boot)

> **Nota:** Para correr Java con Spring Boot se recomienda usar **IntelliJ IDEA**  
> https://es.wikipedia.org/wiki/IntelliJ_IDEA

> **Para principiantes:**  
> Si nunca usaste Spring Boot, podés practicar con este ejemplo simple:  
> https://www.youtube.com/watch?v=YqlxKOY2QmY&t=103s

Este backend es el **núcleo de la aplicación**.  
Se encarga de:

- Recibir las peticiones del usuario desde el **frontend**
- Gestionar la **lógica de negocio**
- Comunicarse con el **microservicio en Python** para obtener el análisis de sentimientos

---

### Requisitos previos

- **Java JDK:** Versión **17 o superior**
- **IntelliJ IDEA:** Recomendado (cualquier versión reciente)

---

### Pasos para ejecutar en IntelliJ IDEA

#### 1. Abrir el proyecto

1. Abrí **IntelliJ IDEA**
2. Seleccioná **File > Open**
3. Buscá la carpeta `sentimentAPI` (o la carpeta donde esté el código Java)

⚠️ **Importante:**  
Asegurate de abrir la carpeta que contiene el archivo **`pom.xml`**

---

#### 2. Cargar dependencias (Maven)

- Al abrir el proyecto, IntelliJ debería detectar automáticamente el archivo `pom.xml`
- Si aparece una notificación flotante, hacé clic en **"Load Maven Changes"**  
  (ícono de una **M** pequeña con símbolo de recarga)
- Esperá a que la barra de progreso inferior termine de descargar las librerías


#### 3. Ejecutar la aplicación
-Busca el archivo principal (usualmente llamado SentimentApiApplication.java dentro de src/main/java).
-Haz clic derecho sobre el archivo y selecciona "Run 'SentimentApiApplication'...".
O simplemente presiona el botón de Play verde en la barra superior si ya detectó la configuración.


## Nota importante sobre el orden de ejecución

Para que el sistema funcione completo, el **orden ideal de encendido** es:

1. Primero enciende el **Microservicio de Python** en VSC u otro similar.
2. Luego enciende este **Backend de Java** (Puerto 8080 por defecto) - IntelliJ.
