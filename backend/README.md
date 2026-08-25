# Tripleten web_project_around_express

## Descripción del Proyecto

API REST para el proyecto "Alrededor de los EE.UU." que permite gestionar usuarios y tarjetas de lugares turísticos. Este backend proporciona endpoints para obtener listas de usuarios, tarjetas individuales, y buscar usuarios por su ID único.

### Funcionalidades

- **GET /users**: Devuelve la lista completa de usuarios registrados
- **GET /cards**: Devuelve la lista completa de tarjetas de lugares turísticos
- **GET /users/:_id**: Devuelve un usuario específico según su ID
- **Manejo de errores 404**: Respuesta adecuada cuando se solicita un recurso inexistente
- **Hot reload**: Reinicio automático del servidor durante el desarrollo

## Tecnologías y Técnicas Utilizadas

### Tecnologías

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor
- **Express.js**: Framework web para Node.js que facilita la creación de APIs REST
- **fs (File System)**: Módulo nativo de Node.js para lectura de archivos JSON
- **path**: Módulo nativo de Node.js para manejo de rutas de archivos
- **ESLint**: Herramienta de análisis de código estático con configuración Airbnb
- **EditorConfig**: Mantenimiento de estilo de código consistente entre editores
- **nodemon**: Herramienta para reinicio automático del servidor durante desarrollo

### Técnicas Implementadas

- **Arquitectura modular**: Separación de rutas en archivos independientes (`routes/users.js`, `routes/cards.js`)
- **Rutas RESTful**: Diseño de endpoints siguiendo convenciones REST
- **Manejo de archivos JSON**: Lectura asíncrona de datos desde archivos estáticos
- **Rutas dinámicas**: Uso de parámetros de URL (`:_id`) para búsquedas específicas
- **Middlewares de Express**: Uso de `app.use()` para montar routers y manejar errores 404
- **Manejo de errores**: Respuestas HTTP apropiadas (200, 404, 500) según el contexto
- **Código limpio**: Aplicación de estándares de calidad con ESLint y Airbnb config
- **Control de versiones**: Git para seguimiento de cambios y GitHub para repositorio remoto

## Estructura del Proyecto

web_project_around_express/
├── .editorconfig # Configuración de estilo de código
├── .eslintrc # Configuración de ESLint con Airbnb
├── .gitignore # Archivos ignorados por Git
├── app.js # Punto de entrada del servidor
├── data/
│ ├── cards.json # Datos de tarjetas
│ └── users.json # Datos de usuarios
├── routes/
│ ├── users.js # Rutas de usuarios
│ └── cards.js # Rutas de tarjetas
├── package.json # Dependencias y scripts
└── README.md # Este archivo

Autor
Wilson Rolando Herrera Romero
Proyecto desarrollado como parte del curso de Desarrollo Web de TripleTen.
