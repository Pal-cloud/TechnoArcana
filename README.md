# TechnoArcana - Tarot STEM

## 🌟 Características

### Nivel 1: Visualización básica de cartas
- **Página principal**: Muestra todas las cartas boca abajo
- **Detalle de carta**: Al hacer clic, navega a una página con información detallada
- **Navegación avanzada**: Sistema de flechas para moverse entre cartas con números romanos
- **Visualización ampliada**: Modal para ver imágenes en pantalla completa
- **API Integration**: Consume la API pública de cartas de tarot
- **Efectos de sonido**: Sonidos atmosféricos al interactuar con las cartas
- **Control de audio**: Botón para activar/desactivar efectos de sonido

### Nivel 2: Lectura de cartas (Pasado, Presente, Futuro)
- **Selección de tres cartas**: Permite seleccionar exactamente 3 cartas
- **Posiciones específicas**: Asigna cartas a Pasado, Presente y Futuro
- **Placeholders visuales**: Las cartas seleccionadas se marcan con huecos dorados que muestran qué carta fue elegida y para qué posición
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
   
   La aplicación estará disponible en `http://localhost:5173`

3. **Vista previa local** (opcional):
   ```bash
   npm run preview
   ```

4. **Construir para producción** (solo si vas a hacer deployment):
   ```bash
   npm run build
   ```
   
   > **Nota**: Este comando genera una carpeta `dist` con los archivos optimizados para producción. Solo necesario si planeas desplegar la aplicación.

5. **Ejecutar tests**:
   ```bash
   npm test        # Modo watch (para desarrollo)
   npm run test:run # Ejecutar una vez
   ```

## 📁 Estructura del proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Header/          # Navegación principal con botones destacados y logo personal
│   ├── TarotCard/       # Componente de carta individual con efectos
│   ├── Footer/          # Footer con enlaces y créditos
│   ├── SoundControl/    # Control de efectos de sonido
│   └── FloatingElements/ # Elementos flotantes de fondo (astrológicos y científicos)
├── contexts/            # Contextos globales
│   └── SoundContext.jsx # Contexto para compartir estado de audio
├── hooks/               # Hooks personalizados
│   └── useSoundEffectsSimple.js # Hook para manejo de audio
├── pages/               # Páginas de la aplicación
│   ├── HomePage.jsx     # Página principal con todas las cartas
│   ├── CardDetailPage.jsx # Detalle de carta individual
│   └── ReadingPage.jsx  # Página de lectura de tres cartas
├── services/            # Servicios para API
│   └── tarotService.js  # Funciones para consumir la API
├── public/              # Archivos estáticos
│   ├── images/          # Logo personal y recursos visuales
│   │   ├── favicon.png  # Favicon personalizado
│   │   └── logo-pal.png # Logo personal (header y footer)
│   └── sounds/          # Efectos de sonido
│       ├── card-hover.mp3 # Efecto de sonido hover
│       ├── card-click.mp3 # Efecto de sonido click
│       └── raven.mp3    # Efecto de sonido logo personal
├── App.jsx              # Componente principal
├── router.jsx           # Configuración de rutas
└── main.jsx            # Punto de entrada
```

## 🎵 Efectos de Sonido

La aplicación incluye efectos de sonido atmosféricos para mejorar la experiencia del usuario:

### Sonidos disponibles:
- **Hover**: Sonido sutil al pasar el mouse sobre una carta
- **Click**: Sonido más pronunciado al hacer clic en una carta
- **Logo**: Sonido especial al pasar el mouse sobre el logo personal

### Configuración de archivos de audio:
- **Ubicación**: `public/sounds/`
- **Archivos incluidos**: card-hover.mp3, card-click.mp3, raven.mp3
- **Control de usuario**: Botón flotante para activar/desactivar sonidos

## 🌟 Elementos Flotantes de Fondo

La aplicación incluye elementos flotantes atmosféricos que se mueven continuamente por la pantalla para crear una experiencia inmersiva.

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

- **React 18**: Framework principal con hooks avanzados
- **React Router DOM**: Navegación entre páginas con navegación circular
- **Vite**: Servidor de desarrollo y build tool
- **Vitest**: Framework de testing rápido y moderno
- **React Testing Library**: Testing de componentes React
- **CSS3**: Animaciones y modales
- **Fetch API**: Para consumir la API REST
- **SweetAlert2**: Modales elegantes y personalizados
- **JavaScript ES6+**: Funciones avanzadas como conversión a números romanos
- **Responsive Design**: Optimización para todos los dispositivos

## 🧪 Testing

El proyecto incluye tests unitarios para los componentes principales:

### Tests implementados:
- **Header Component**: Navegación, logo personal, enlaces y estructura HTML
- **Footer Component**: Enlaces sociales, información de contacto y estructura semántica

### Ejecutar tests:
```bash
npm test        # Modo watch - se ejecutan automáticamente al cambiar código
npm run test:run # Ejecutar una sola vez
```

### Cobertura de tests:
- ✅ Renderizado correcto de componentes
- ✅ Navegación y enlaces
- ✅ Atributos de elementos HTML
- ✅ Estructura semántica (roles ARIA)
- ✅ Manejo de assets (imágenes, logos)

### Resultados de tests:
(public\images\prueba test.PNG)
*Todos los tests pasando correctamente: 11 tests en 2 archivos (Header: 5 tests, Footer: 6 tests)*

```
✓ src/components/Header/Header.test.jsx (5 tests) 164ms
✓ src/components/Footer/Footer.test.jsx (6 tests) 191ms

Test Files  2 passed (2)
Tests  11 passed (11)
Duration  2.15s
```

## 📱 Responsive Design

La aplicación está optimizada para:
- Desktop 
- Tablet 
- Mobile 

## ✨ Características destacadas

- **Imágenes optimizadas**: Combinación de imágenes flotantes y enmarcadas según el contexto
- **Animaciones suaves**: Transiciones y hover effects elegantes
- **Estado persistente**: Manejo eficiente del estado con React hooks
- **Componentes modulares**: Código reutilizable y mantenible
- **Experiencia visual superior**: Placeholders dorados, modales elegantes y feedback inmediato
- **Navegación intuitiva**: Sistema de flechas, números romanos y orientación constante
- **Responsive**: Adaptable a todos los dispositivos con optimizaciones específicas

## 🎯 Navegación y Visualización Avanzada

### Sistema de navegación intuitivo
- **Navegación circular**: Permite moverse entre cartas de forma continua (la última conecta con la primera)

### Visualización de imágenes mejorada
- **Modal de ampliación**: Clic en cualquier imagen de carta para verla en pantalla completa
- **Indicador visual de zoom**: Lupa que aparece al hacer hover sobre imágenes ampliables
- **Controles de cierre múltiples**: 
  - Botón X en la esquina
  - Clic fuera del modal
  - Tecla Escape

## 🎯 Funcionalidades principales

### Página de inicio
- Grid responsive de cartas boca abajo
- **Navegación destacada**: Botones "Cartas" y "Lectura" claramente visibles con efectos dorados
- Loading states y manejo de errores
- Navegación intuitiva

### Lectura de cartas
- Selección guiada de 3 cartas
- **Sistema de placeholders inteligente**: Las cartas seleccionadas se marcan con huecos dorados distintivos
- **Información contextual**: Cada placeholder muestra el nombre de la carta y la posición asignada (Pasado, Presente, Futuro)
- **Grid completo persistente**: Todas las cartas permanecen visibles para mejor orientación
- **Indicadores visuales claros**: Iconos de confirmación (✓) y bordes dorados punteados
- **Efectos hover**: Interacciones suaves en placeholders y cartas disponibles
- Prevención de selecciones duplicadas
- Visualización clara de posiciones
- Opción de reiniciar lectura

### Footer
- Información de FactoriaF5 con enlace oficial
- Enlaces personales a GitHub y LinkedIn
- **Logo personal clickeable**: Modal elegante con SweetAlert2 que copia el email al portapapeles
  
## 🙏 Agradecimientos

Este proyecto fue desarrollado en colaboración con el equipo formativo **FactoriaF5 Barcelona** 🌟

Agradecimiento especial a **@MAlexGG** por crear la API utilizada en este proyecto.

## 📄 Licencia

Este proyecto es parte de un ejercicio educativo para aprender React y consumo de APIs.
