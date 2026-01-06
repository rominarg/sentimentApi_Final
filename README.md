Microservicio de Data Science (Python)
Este componente es el encargado de alojar la inteligencia del sistema. Funciona como una API independiente (Microservicio) construida con FastAPI que expone el modelo entrenado.

Nota de Arquitectura: Este servicio no es el backend principal. Su única función es recibir texto del Backend de Java, procesarlo y devolver la predicción de sentimiento.

Configuración y Ejecución
Python lo abrimos con Visual Studio Code o similar.

Ubícate en la carpeta del servicio:

Bash

cd Backend
Crea tu entorno virtual:

Bash

python -m venv venv
Activa el entorno virtual (Windows):

Bash

.\venv\Scripts\activate
Instala las dependencias del archivo requirement (esto solo se hace 1 vez al principio). Instala FastAPI, Uvicorn, Scikit-learn, Pandas, etc.:

Bash

pip install -r requirements.txt
Levanta el Microservicio. Ejecutamos el servidor en el puerto 5000 para que no choque con el Backend de Java (que usará el 8080 por defecto):

Bash

uvicorn app:app --reload --port 5000
¿Por qué tenemos que cambiar el puerto?
Spring Boot (backend) viene con un servidor web "incrustado" (generalmente uno llamado Tomcat) que está configurado de fábrica para escuchar siempre en el puerto 8080.

Cómo detener el servicio
¡Recordar! Cuando dejamos de usar el sistema:

Para cerrarlo presiona: CTRL + C

Escribe en la terminal para desactivar el entorno:

Bash

deactivate
Backend Principal (Java Spring Boot)
Para correr Java con Spring Boot use el programa IntelliJ IDEA (Wikipedia).

(Para los que nunca lo usaron pueden practicar con este ejemplo simple: Video Tutorial)

Este es el núcleo de la aplicación. Se encarga de recibir las peticiones del usuario desde el frontend, gestionar la lógica de negocio y comunicarse con el microservicio de Python para obtener el análisis de sentimientos.

Requisitos previos:
Java JDK: Versión 17 o superior.

IntelliJ IDEA: Recomendado (Cualquier versión reciente).

Pasos para ejecutar en IntelliJ IDEA:
Abrir el proyecto

Abre IntelliJ IDEA.

Selecciona File > Open y busca la carpeta sentimentAPI (o la carpeta donde esté el código Java).

Importante: Asegúrate de abrir la carpeta que contiene el archivo pom.xml.

Cargar dependencias (Maven)

Al abrir el proyecto, IntelliJ debería detectar automáticamente el archivo pom.xml.

Si ves una notificación flotante pequeña, haz clic en el icono de "Load Maven Changes" (es una M pequeña con un símbolo de recarga).

Espera a que la barra de progreso inferior termine de descargar las librerías.

Ejecutar la aplicación

Busca el archivo principal (usualmente llamado SentimentApiApplication.java dentro de src/main/java).

Haz clic derecho sobre el archivo y selecciona "Run 'SentimentApiApplication'...".

O simplemente presiona el botón de Play verde en la barra superior si ya detectó la configuración.

Nota importante sobre el orden de ejecución
Para que el sistema funcione completo, el orden ideal de encendido es:

Primero enciende el Microservicio de Python en VSC u otro similar.

Luego enciende este Backend de Java (Puerto 8080 por defecto) en IntelliJ.

Flujo de la arquitectura
Plaintext

Frontend -> Backend (Java/Spring Boot) -> Python (Microservicios) -> Backend (Java/Spring Boot) -> Frontend
Java (puerto 8080) se comunica con Python (puerto 5000).
