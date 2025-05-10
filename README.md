# NutriFoto 📱

NutriFoto es una aplicación móvil innovadora que combina la tecnología de escaneo de códigos de barras con el seguimiento de salud para ayudarte a mantener un estilo de vida saludable de manera fácil y divertida.

![NutriFoto Banner](assets/banner.png)

## 🌟 Características Principales

### 📸 Escaneo Inteligente
- Escaneo instantáneo de códigos de barras de productos alimenticios
- Base de datos nutricional completa y actualizada
- Información detallada de macronutrientes y calorías
- Historial de productos escaneados

### 🏃‍♂️ Integración con Salud
- Sincronización con Apple HealthKit y Google Fit
- Seguimiento automático de actividad física
- Registro de pasos diarios y calorías quemadas
- Monitoreo de peso y composición corporal

### 🎮 Sistema de Gamificación
- Desafíos diarios y semanales
- Sistema de logros y medallas
- Puntos por hábitos saludables
- Tabla de clasificación con amigos

### 📊 Análisis y Seguimiento
- Gráficos detallados de progreso
- Informes semanales y mensuales
- Recomendaciones personalizadas
- Seguimiento de objetivos nutricionales

## 🛠 Tecnologías Utilizadas

- **Frontend**: React Native, Expo
- **Estado**: Zustand
- **Navegación**: React Navigation
- **Escaneo**: Expo Barcode Scanner
- **Salud**: React Native Health, Google Fit
- **UI/UX**: Styled Components
- **Animaciones**: React Native Reanimated
- **Almacenamiento**: AsyncStorage, SecureStore

## 📱 Requisitos del Sistema

### Para Usuarios
- iOS 13.0 o superior
- Android 8.0 o superior
- Conexión a Internet para sincronización

### Para Desarrolladores
- Node.js 14.0 o superior
- npm o yarn
- Expo CLI
- Cuenta de Expo
- Android Studio (para desarrollo en Android)
- Xcode (para desarrollo en iOS, solo macOS)

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Portuno/NutriFoto.git
cd nutrifoto
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
# Edita el archivo .env con tus credenciales
```

4. Inicia la aplicación:
```bash
npx expo start
```

## 📁 Estructura del Proyecto

```
nutrifoto/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── common/         # Componentes básicos
│   │   ├── food/          # Componentes relacionados con alimentos
│   │   └── fitness/       # Componentes relacionados con fitness
│   ├── screens/            # Pantallas de la aplicación
│   │   ├── auth/          # Pantallas de autenticación
│   │   ├── food/          # Pantallas de alimentos
│   │   └── fitness/       # Pantallas de fitness
│   ├── navigation/         # Configuración de navegación
│   ├── store/             # Estado global (Zustand)
│   ├── services/          # Servicios y APIs
│   ├── utils/             # Utilidades y helpers
│   └── types/             # Definiciones de TypeScript
├── assets/                # Imágenes y recursos
└── App.tsx               # Punto de entrada de la aplicación
```

## 🔐 Seguridad

- Autenticación segura con JWT
- Almacenamiento encriptado de datos sensibles
- Protección contra ataques XSS
- Validación de datos con Zod
- Cumplimiento con GDPR y CCPA

## 📈 Roadmap

### Fase 1 (Actual)
- [x] Escaneo básico de códigos de barras
- [x] Integración con HealthKit/Google Fit
- [x] Sistema de gamificación básico

### Fase 2 (Próxima)
- [ ] Reconocimiento de imágenes de alimentos
- [ ] Planes de alimentación personalizados
- [ ] Comunidad y redes sociales

### Fase 3 (Futura)
- [ ] IA para recomendaciones nutricionales
- [ ] Integración con dispositivos IoT
- [ ] Marketplace de recetas saludables

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Lautaro Sarni** - *Desarrollador Principal* - [@Portuno](https://github.com/Portuno)

## 📞 Contacto

- Email: lautaro.sarni@gmail.com
- GitHub: [@Portuno](https://github.com/Portuno)
- LinkedIn: [Lautaro Sarni](https://linkedin.com/in/lautarosarni)

## 🙏 Agradecimientos

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Open Food Facts](https://world.openfoodfacts.org/)
- [React Navigation](https://reactnavigation.org/) 