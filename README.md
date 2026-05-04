# Note2Quiz Frontend

Aplicación móvil construida con Expo para transformar apuntes en cuestionarios interactivos. Esta interfaz consume la API de Note2Quiz para autenticación, OCR de imágenes, generación de quizzes, resolución de intentos y recuperación de contraseña.

Repositorio del backend: https://github.com/ErikCaballeroh/note2quiz-backend

## Qué hace la app

Note2Quiz permite que un usuario:

- Cree una cuenta e inicie sesión.
- Suba imágenes de apuntes para extraer texto con OCR.
- Genere cuestionarios a partir de sus notas.
- Responda quizzes y guarde su progreso.
- Revise quizzes recientes y guardados.
- Organice contenido por categorías.
- Recupere su contraseña mediante código enviado por correo.

## Funcionalidades principales

- Autenticación con registro, login y cierre de sesión.
- Flujo completo de recuperación de contraseña:
   - Enviar correo con código de 6 dígitos.
   - Verificar código.
   - Definir nueva contraseña con confirmación.
- Captura de notas mediante imágenes.
- OCR para extraer texto desde imágenes.
- Generación de quizzes a partir de apuntes.
- Juego de preguntas con progreso y resultados.
- Guardado y organización de quizzes.
- Estadísticas de usuario y actividad.

## Tecnologías

### Frontend

- Expo
- React Native
- Expo Router
- TypeScript
- NativeWind
- TanStack Query
- Axios
- Zod
- Lucide React Native
- Async Storage

### Backend relacionado

El backend usa Express, TypeScript, Prisma y MariaDB. Además integra servicios externos para:

- OCR con Clarifai
- Envío de correos con Resend
- Generación de quizzes con un modelo de IA

## Estructura general

- `app/` contiene las rutas de Expo Router.
- `app/(auth)/` agrupa login, registro y recuperación de contraseña.
- `app/(tabs)/` contiene las pantallas principales de la app.
- `app/quiz/` contiene el flujo de procesamiento, vista previa, edición y juego.
- `src/components/` contiene UI reutilizable por dominio.
- `src/hooks/` contiene hooks de datos y mutaciones.
- `src/services/` contiene los clientes para consumir la API.
- `src/schemas/` contiene validaciones con Zod.
- `src/types/` contiene tipos y DTOs de la API.

## Requisitos

- Node.js 18 o superior.
- npm.
- Un backend de Note2Quiz corriendo localmente o accesible por red.

## Instalación

1. Instala dependencias.

   ```bash
   npm install
   ```

2. Configura las variables de entorno.

   Crea un archivo `.env` en la raíz del proyecto con la URL de la API:

   ```env
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

   Ajusta la URL si el backend corre en otro host o puerto.

3. Inicia la app.

   ```bash
   npx expo start
   ```

## Uso

### Flujo básico

1. Abre la app y entra a la pantalla de login.
2. Inicia sesión con una cuenta existente o regístrate.
3. Desde inicio, captura imágenes de tus apuntes.
4. Revisa el texto procesado y genera un quiz.
5. Juega el quiz, guarda resultados y consulta tu historial.

### Recuperación de contraseña

1. En login toca “¿Olvidaste tu contraseña?”.
2. Escribe tu correo y solicita el código.
3. Ingresa el código de 6 dígitos recibido por email.
4. Define una nueva contraseña y confírmala.
5. Vuelve a iniciar sesión con la contraseña actualizada.

## Integración con la API

La app consume la API del backend Note2Quiz en la ruta base definida por `EXPO_PUBLIC_API_URL`.

### Endpoints usados

#### Autenticación

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

#### Recuperación de contraseña

- `POST /auth/forgot-password`
- `POST /auth/verify-reset-code`
- `POST /auth/reset-password`

#### Quizzes

- `GET /quizzes`
- `GET /quizzes/recent`
- `GET /quizzes/:id`
- `POST /quizzes/generate`
- `POST /quizzes`
- `PUT /quizzes/:id`
- `DELETE /quizzes/:id`

#### Categorías

- CRUD de categorías para organizar quizzes.

#### OCR

- `POST /ocr`

#### Intentos

- `POST /attempts`
- `GET /attempts/:quizId`

## Backend

El backend de Note2Quiz expone la API REST y maneja:

- Autenticación con JWT.
- Procesamiento de imágenes con OCR.
- Generación de quizzes con IA.
- Gestión de categorías, quizzes e intentos.
- Recuperación de contraseña por correo con código temporal.

Repositorio: https://github.com/ErikCaballeroh/note2quiz-backend

### Variables relevantes del backend

El backend requiere configuración propia, entre ellas:

- `DATABASE_URL`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`
- `JWT_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CLARIFAI_PAT`

Consulta el README del backend para la configuración completa.

## Datos de prueba

El backend incluye seeds con usuario y quizzes de ejemplo para probar el flujo completo.

- Usuario semilla: `erik@test.com`
- Contraseña semilla: `test1234`

## Scripts disponibles

- `npm start`: inicia Expo.
- `npm run android`: abre la app en Android.
- `npm run ios`: abre la app en iOS.
- `npm run web`: ejecuta la versión web.
- `npm run lint`: ejecuta el linter.

## Notas de desarrollo

- La navegación se organiza con Expo Router y rutas por archivo.
- El token de sesión se guarda en Async Storage.
- La validación de formularios se maneja con Zod.
- La comunicación con la API se hace con Axios y React Query.

## Licencia

CC BY-NC-SA 4.0 – Solo uso no comercial.  