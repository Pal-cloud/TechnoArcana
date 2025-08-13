# TechnoArcana - Tarot STEM

Una aplicación web en React que permite visualizar cartas de tarot dedicadas a las mujeres destacadas en ciencia y tecnología. 

## 🌟 Características

### Nivel 1: Visualización básica de cartas
- **Página principal**: Muestra todas las cartas boca abajo
- **Detalle de carta**: Al hacer clic, navega a una página con información detallada
- **API Integration**: Consume la API pública de cartas de tarot

### Nivel 2: Lectura de cartas (Pasado, Presente, Futuro)
- **Selección de tres cartas**: Permite seleccionar exactamente 3 cartas
- **Posiciones específicas**: Asigna cartas a Pasado, Presente y Futuro
- **Significados**: Muestra el significado y la diosa contemporánea asociada
- **Reinicio**: Permite comenzar una nueva lectura

## 🚀 Instalación y uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

## 📁 Estructura del proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Header/          # Navegación principal
│   ├── TarotCard/       # Componente de carta individual
│   └── Footer/          # Footer con enlaces y créditos
├── pages/               # Páginas de la aplicación
│   ├── HomePage.jsx     # Página principal con todas las cartas
│   ├── CardDetailPage.jsx # Detalle de carta individual
│   └── ReadingPage.jsx  # Página de lectura de tres cartas
├── services/            # Servicios para API
│   └── tarotService.js  # Funciones para consumir la API
├── App.jsx              # Componente principal
├── router.jsx           # Configuración de rutas
└── main.jsx            # Punto de entrada
```

## 🔗 API

La aplicación consume la API pública de cartas de tarot:
```
https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot
```

### Estructura de datos de cada carta:
```json
{
  "id": "1",
  "arcaneNumber": "0",
  "arcaneName": "El Loco",
  "arcaneDescription": "Descripción detallada del significado de la carta.",
  "arcaneImage": {
    "imageSrc": "URL de la imagen de la carta",
    "author": "Autor de la imagen",
    "license": "Licencia de uso"
  },
  "goddessName": "Nombre de la diosa contemporánea asociada",
  "goddessDescription": "Descripción biográfica o información relevante sobre la diosa contemporánea.",
  "goddessImage": {
    "imageSrc": "URL de la imagen de la diosa",
    "author": "Autor de la imagen",
    "licenseUrl": "URL de la licencia de uso"
  }
}
```

## 🛠️ Tecnologías utilizadas

- **React 18**: Framework principal
- **React Router DOM**: Navegación entre páginas
- **Vite**: Build tool y servidor de desarrollo
- **CSS3**: Estilos con gradientes y animaciones
- **Fetch API**: Para consumir la API REST

## 📱 Responsive Design

La aplicación está optimizada para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ✨ Características destacadas

- **Interfaz intuitiva**: Diseño moderno con gradientes y efectos visuales
- **Animaciones suaves**: Transiciones y hover effects
- **Estado persistente**: Manejo eficiente del estado con React hooks
- **Componentes modulares**: Código reutilizable y mantenible
- **Responsive**: Adaptable a todos los dispositivos

## 🎯 Funcionalidades principales

### Página de inicio
- Grid responsive de cartas boca abajo
- Loading states y manejo de errores
- Navegación intuitiva

### Detalle de carta
- Información completa del arcano
- Datos de la diosa contemporánea
- Imágenes con créditos y licencias
- Navegación de vuelta

### Lectura de cartas
- Selección guiada de 3 cartas
- Prevención de selecciones duplicadas
- Visualización clara de posiciones
- Opción de reiniciar lectura

### Footer
- Información de FactoriaF5 con enlace oficial
- Enlaces personales a GitHub y LinkedIn
- Diseño atractivo con gradientes y efectos hover
- Responsive para todos los dispositivos

## 🙏 Agradecimientos

Este proyecto fue desarrollado en colaboración con el equipo formativo **FactoriaF5 Barcelona** 🌟

Agradecimiento especial a **@MAlexGG** por crear la API utilizada en este proyecto.

## 📄 Licencia

Este proyecto es parte de un ejercicio educativo para aprender React y consumo de APIs.
