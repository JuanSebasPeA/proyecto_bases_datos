# 🍽️ Sistema de Reservas de Restaurante

Sistema de gestión de reservas para restaurantes desarrollado con Node.js y MongoDB. Permite administrar clientes, mesas y reservaciones de manera eficiente.

## 📋 Características

- Gestión de clientes
- Control de mesas y capacidades
- Sistema de reservaciones
- Verificación de disponibilidad
- API RESTful
- Relaciones entre entidades

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- colors

## 🚀 Instalación

1. Clona el repositorio:

2. Instala las dependencias:

``` npm install ```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto:

4. Iniciar el servidor:

### Modo desarrollo
```npm run dev```

### Modo producción
```npm start```


## 📌 Endpoints API

### Clientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/clientes` | Crear cliente |
| GET | `/clientes` | Listar clientes |
| GET | `/clientes/:id` | Obtener cliente |
| PUT | `/clientes/:id` | Actualizar cliente |
| DELETE | `/clientes/:id` | Eliminar cliente |

#### Ejemplo crear cliente:
```json
{
    "nombre": "Carlos Gómez",
    "correo": "carlos@example.com",
    "telefono": "123456789"
}
```


### Mesas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/mesas` | Crear mesa |
| GET | `/mesas` | Listar mesas |
| GET | `/mesas/:id` | Obtener mesa |
| PUT | `/mesas/:id` | Actualizar mesa |
| DELETE | `/mesas/:id` | Eliminar mesa |

#### Ejemplo crear mesa:
```json
{
    "numero": 5,
    "capacidad": 4,
    "ubicacion": "Ventana"
}
```


### Reservas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/reservas` | Crear reserva |
| GET | `/reservas` | Listar reservas |
| GET | `/reservas/:id` | Obtener reserva |
| PUT | `/reservas/:id` | Actualizar reserva |
| DELETE | `/reservas/:id` | Eliminar reserva |

#### Ejemplo crear reserva:
```json
{
    "clienteId": "64f5a2b3c4d5e6f7g8h9i0j1",
    "mesaId": "64f5a2b3c4d5e6f7g8h9i0j2",
    "fecha": "2024-03-25T19:00:00Z",
    "personas": 3
}
```
