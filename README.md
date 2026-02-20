# Resigcla v1 Server

Servidor backend para la aplicación Resigcla v1, desarrollado con Node.js, Express y PostgreSQL.

## 📋 Descripción

Este repositorio contiene el código del servidor backend de Resigcla v1. Es una API REST construida con Node.js que utiliza Express como framework web y PostgreSQL como base de datos.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **PostgreSQL (pg)** - Base de datos relacional
- **bcrypt** - Encriptación de contraseñas
- **CORS** - Middleware para habilitar CORS
- **dotenv** - Gestión de variables de entorno
- **Morgan** - Logger de peticiones HTTP
- **Multer** - Manejo de archivos multipart/form-data

## 📁 Estructura del Proyecto

```
resigcla-v1-server-nodejs/
├── src/
│   ├── app.js           # Configuración de la aplicación Express
│   ├── index.js         # Punto de entrada del servidor
│   ├── config.js        # Configuración general
│   ├── controllers/     # Controladores de la aplicación
│   ├── routes/          # Definición de rutas
│   ├── database/        # Configuración y modelos de base de datos
│   └── files/           # Archivos estáticos/uploads
├── package.json
└── .gitignore
```

## 🔧 Requisitos Previos

- Node.js (versión 14 o superior)
- PostgreSQL
- Yarn (opcional, pero recomendado)

## ⚙️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/jenestiven/resigcla-v1-server-nodejs.git
cd resigcla-v1-server-nodejs
```

2. Instala las dependencias:
```bash
yarn install
# o
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=resigcla
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

4. Configura la base de datos PostgreSQL:
```bash
# Crea la base de datos
createdb resigcla
# Ejecuta las migraciones (si las hay)
```

## 🚀 Uso

### Modo Desarrollo
```bash
yarn dev
# o
npm run dev
```
El servidor se iniciará con auto-recarga en cambios de código.

### Modo Producción
```bash
yarn start
# o
npm start
```

### Build
```bash
yarn build
# o
npm run build
```

## 📝 Scripts Disponibles

- `yarn dev` - Inicia el servidor en modo desarrollo con auto-recarga
- `yarn start` - Inicia el servidor en modo producción
- `yarn build` - Ejecuta el proceso de build

## 🌐 API Endpoints

_(Documenta aquí los endpoints disponibles en tu API)_

```
GET    /api/...
POST   /api/...
PUT    /api/...
DELETE /api/...
```

## 🔒 Seguridad

- Las contraseñas se encriptan usando bcrypt
- CORS configurado para controlar el acceso
- Variables sensibles gestionadas con dotenv

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👤 Autor

**jenestiven**

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en este repositorio.

---

⭐️ Si este proyecto te fue útil, considera darle una estrella en GitHub