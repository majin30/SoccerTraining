# ⚽ SoccerTraining App

**SoccerTraining** es una aplicación móvil profesional de **entrenamiento deportivo especializado en fútbol**, desarrollada con **React Native (Expo)**.  
Su objetivo es brindar a jugadores, entrenadores y entusiastas una plataforma completa para mejorar su rendimiento físico, técnico y táctico.

---

## 🚀 Tecnologías utilizadas

- **React Native** (Expo)
- **React Navigation** (`@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`)
- **Lottie Animations** (para la intro animada del logo)
- **Expo Vector Icons** (para íconos en la barra inferior)
- **Metro Bundler / Yarn**
- **JavaScript (ES6+)**
- **Arquitectura modular basada en componentes**

---

## 🧭 Estructura general del proyecto

SoccerTraining/
├── App.js
├── package.json
├── assets/
│ ├── images/
│ │ └── bg-stadium.png
│ └── animations/
│ └── logo.json
├── src/
│ ├── navigations/
│ │ ├── AppNavigation.js
│ │ ├── HandlerNavigation.js
│ │ ├── stacks/
│ │ │ ├── AuthNavigation.js
│ │ │ ├── TrainingNavigation.js
│ │ │ ├── ProgressNavigation.js
│ │ │ ├── NutritionNavigation.js
│ │ │ ├── SettingsNavigation.js
│ │ └── BottomTabNavigation/
│ │ └── BottomTabNavigation.js
│ ├── screens/
│ │ ├── Auth/
│ │ │ ├── AuthStartScreen.js
│ │ │ ├── LoginScreen.js
│ │ │ ├── RegisterScreen.js
│ │ ├── Training/
│ │ │ ├── TrainingDashboardScreen.js
│ │ │ ├── ExerciseDetailScreen.js
│ │ │ ├── CustomTrainingScreen.js
│ │ ├── Progress/
│ │ │ ├── ProgressOverviewScreen.js
│ │ │ ├── HistoryScreen.js
│ │ │ ├── AchievementsScreen.js
│ │ ├── Nutrition/
│ │ │ ├── NutritionDashboardScreen.js
│ │ │ ├── HydrationScreen.js
│ │ │ ├── SupplementsScreen.js
│ │ ├── Settings/
│ │ │ ├── SettingsScreen.js
│ │ │ ├── EditProfileScreen.js
│ │ │ ├── NotificationsScreen.js
│ │ └── Global/
│ │ ├── CameraScreen.js
│ │ ├── UserProfileScreen.js
│ │ ├── ImageFullScreen.js
│ └── utils/
│ └── screens.js
└── README.md

yaml
Copiar código

---

## 🏁 Flujo de navegación

### 🔹 Inicio (Intro Animada)
- Animación Lottie del logo `logo.json`
- Fondo de estadio (`bg-stadium.png`)
- Botón flotante **INICIAR** que dirige al login.

### 🔹 Autenticación
- **LoginScreen** → Inicio de sesión de usuario.  
- **RegisterScreen** → Registro de nuevos usuarios.

### 🔹 Navegación principal (`BottomTabNavigation`)
Una vez autenticado, el usuario accede al **menú principal con 4 secciones**:

| Sección | Descripción |
|----------|--------------|
| ⚽ **Entrenar** | Acceso a rutinas, ejercicios personalizados, y creación de planes. |
| 📊 **Progreso** | Seguimiento de rendimiento físico, historial y logros. |
| 🥗 **Nutrición** | Planes alimenticios, hidratación y suplementos. |
| ⚙️ **Ajustes** | Perfil, notificaciones y configuración general. |

Cada módulo tiene su propio stack de navegación interno para mantener independencia y escalabilidad.

---

## 💡 Diseño y experiencia de usuario

- Estilo **oscuro y moderno**, inspirado en videojuegos deportivos.
- Pantalla inicial tipo “intro de juego”.
- Íconos dinámicos de **MaterialCommunityIcons**.
- Tipografía profesional, botones redondeados y sombras suaves.
- Transiciones suaves entre pantallas con **React Navigation**.

---

## 🔧 Scripts disponibles

En la raíz del proyecto, puedes ejecutar:

| Comando | Descripción |
|----------|-------------|
| `yarn dev` | Inicia el proyecto en modo desarrollo (con túnel y caché limpia). |
| `yarn start` | Inicia el servidor Metro Bundler normal. |
| `yarn android` | Ejecuta la app en un emulador Android. |
| `yarn ios` | Ejecuta la app en iOS (requiere macOS). |
| `yarn web` | Inicia la app en navegador web. |

---

## 🧰 Configuración del comando `yarn dev`

En tu `package.json`:

```json
"scripts": {
  "dev": "expo start --tunnel -c",
  "start": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "web": "expo start --web"
}
Esto permite iniciar el proyecto rápidamente con:

bash
Copiar código
yarn dev
🔮 Próximas funcionalidades planificadas
Categoría	Descripción
🧠 Entrenamientos inteligentes	Integrar IA para sugerir rutinas según el rendimiento del usuario.
🕒 Calendario deportivo	Seguimiento de partidos, entrenamientos y descansos.
🧾 Historial en la nube	Guardar datos en Firebase o Supabase.
📷 Análisis de movimiento	Uso de cámara para analizar técnica y postura.
👥 Modo entrenador	Perfiles de coach con gestión de jugadores y equipos.
🔔 Notificaciones push	Recordatorios de entrenamiento y progreso diario.

🧑‍💻 Contribución
Haz un fork del repositorio.

Crea una rama con tu nueva característica:

bash
Copiar código
git checkout -b feature/nueva-funcionalidad
Haz tus cambios y sube un pull request.

🧾 Licencia
Este proyecto está bajo la licencia MIT.
Puedes usarlo, modificarlo y distribuirlo libremente, siempre reconociendo al autor original.

💬 Autor
Desarrollado por:
👤 JESÚS MAJÍN
📧 majin356@gmail.com
📱 Proyecto personal de entrenamiento digital y mejora deportiva.

🏆 Visión general
SoccerTraining busca ser una de las apps más completas de entrenamiento de fútbol:
una plataforma moderna, visualmente atractiva y técnicamente sólida,
que combine rendimiento físico, progreso personal y motivación constante.
El objetivo final es que cada jugador pueda entrenar como un profesional desde su móvil.