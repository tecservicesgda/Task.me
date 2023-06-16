# Task.me
Carlos Cruz

Task.me es una aplicación web de gestión de tareas que ayuda a los usuarios a mantenerse organizados y realizar sus tareas.

## Características

- Permite a los usuarios agregar, editar y eliminar tareas.
- Permite a los usuarios establecer fechas de vencimiento para las tareas.
- Permite a los usuarios categorizar sus tareas para realizar un seguimiento de sus responsabilidades personales, laborales y escolares.

## Cómo utilizar la aplicación

1. Abre la aplicación en tu navegador web.
2. Utiliza el formulario "To Do" para agregar una nueva tarea. Ingresa el nombre de la tarea, la fecha de vencimiento y la categoría.
3. La nueva tarea aparecerá en la sección "Upcoming".
4. Para editar una tarea existente, haz clic en el botón "Edit" junto a la tarea en la sección "Upcoming". Realiza los cambios necesarios y haz clic en el botón "Save".
5. Para eliminar una tarea existente, haz clic en el botón "Delete" junto a la tarea en la sección "Upcoming".

## Cómo descargar y ejecutar la aplicación en tu máquina local

Para descargar y ejecutar la aplicación `Task.me` en tu máquina local, sigue estos pasos:

1. Asegúrate de tener instalado Node.js y npm en tu máquina. Puedes descargarlos desde el sitio web oficial de Node.js: https://nodejs.org/

2. Clona el repositorio de la aplicación en tu máquina local utilizando el comando `git clone`. Por ejemplo:

Copiar
git clone https://github.com/tecservicesgda/Mini-Reto-2


3. Navega hasta el directorio del proyecto y ejecuta el comando `npm install` para instalar todas las dependencias necesarias:

Copiar
cd Mini-Reto-2 npm install


4. Asegúrate de tener instalado MySQL en tu máquina y crea una base de datos para la aplicación. Puedes hacerlo utilizando la línea de comandos de MySQL o una herramienta gráfica como MySQL Workbench. Puedes encontrar el script de la base de datos en el folder `Database`.

5. Abre el archivo de configuración de la base de datos en el directorio del proyecto y actualiza la información de conexión para que coincida con tu configuración local.

6. Ejecuta el comando `npm start` para iniciar el servidor:

Copiar
npm start


7. Abre tu navegador web y navega hasta `http://localhost:3001` para ver la aplicación en funcionamiento.

## API

La aplicación tiene una API bien diseñada que permite al lado del cliente comunicarse con el servidor y la base de datos. La API define varios puntos finales para manejar las solicitudes de los clientes para obtener todas las tareas, agregar una nueva tarea, actualizar una tarea existente o eliminar una tarea.

## Contribuir

Si deseas contribuir al desarrollo de Task.me, no dudes en hacer un fork del repositorio y enviar un pull request con tus cambios. Asegúrate de seguir las pautas de codificación y documentación del proyecto.

## Licencia

Task.me está licenciado bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más información.
