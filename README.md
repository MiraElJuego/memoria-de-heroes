# Memoria de Héroes - Juego de Memoria

## Descripción

Memoria de Héroes es un juego de memoria interactivo construido con React y Next.js. El juego presenta un tablero de cartas con imágenes de héroes que los jugadores deben emparejar volteando las cartas de dos en dos. El juego incluye un sistema de puntuación y una tabla de récords.

## Tecnologías Utilizadas

- React 18
- Next.js 14.2.15
- TypeScript
- Tailwind CSS
- Framer Motion

## Componentes Principales

### 1. GameBoard

El componente principal que maneja la lógica del juego y renderiza el tablero.

**Características principales:**
- Maneja el estado del juego (cartas volteadas, emparejadas, intentos, etc.).
- Implementa la lógica para inicializar el juego, voltear cartas y comprobar coincidencias.
- Renderiza el tablero de juego y la tabla de puntuaciones.
- Se adapta a diferentes tamaños de pantalla.

### 2. Card

Representa una carta individual en el tablero.

**Características principales:**
- Utiliza Framer Motion para animaciones de volteo suaves.
- Muestra la imagen del héroe cuando está volteada y una imagen de fondo cuando no lo está.

### 3. ScoresTable

Muestra la tabla de récords de los jugadores.

**Características principales:**
- Recupera y muestra las puntuaciones almacenadas en el localStorage.
- Se integra con el diseño general del juego.

## Diseño

El juego presenta un diseño con tema oscuro para una experiencia visual agradable:

- Fondo oscuro con texto claro para mejor contraste.
- Cartas con bordes redondeados y efectos de sombra.
- Animaciones suaves para el volteo de cartas.
- Diseño responsivo que se adapta a diferentes tamaños de pantalla.
- Interfaz limpia y minimalista con énfasis en la jugabilidad.

## Lógica del Juego

1. **Inicialización:** El juego comienza con un conjunto de cartas barajadas y distribuidas en el tablero.
2. **Jugabilidad:**
   - Los jugadores hacen clic en las cartas para voltearlas.
   - Solo se pueden voltear dos cartas a la vez.
   - Si las dos cartas volteadas coinciden, se mantienen visibles y se consideran emparejadas.
   - Si no coinciden, se vuelven a ocultar después de un breve período.
3. **Puntuación:** El juego cuenta el número de intentos realizados por el jugador.
4. **Victoria:** El juego termina cuando todas las cartas han sido emparejadas.
5. **Récords:** Las puntuaciones se guardan en el localStorage y se muestran en la tabla de récords.

## Instalación y Ejecución

Para instalar y ejecutar el juego en tu máquina local, sigue estos pasos:

1. Asegúrate de tener instalado nvm (Node Version Manager).

2. Clona el repositorio:

```bash
git clone https://github.com/lgzarturo/memoria-de-heroes.git
cd memoria-de-heroes
```

3. Usa nvm para instalar y usar la versión correcta de Node.js:

```bash
nvm install 20.15.0
nvm use 20.15.0
```

4. Instala las dependencias:

```bash
npm install
```

5. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

6. Abre tu navegador y visita `http://localhost:3000` para jugar al juego.

## Contribuir

Si deseas contribuir al proyecto, por favor:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu función: `git checkout -b nueva-funcion`
3. Haz tus cambios y realiza commit: `git commit -m 'Añade nueva función'`
4. Empuja a la rama: `git push origin nueva-funcion`
5. Envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [`LICENSE`](LICENSE.md) para más detalles.
