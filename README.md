# ReICEGeD — Registro de Instaladores Calificados (EPRE Río Negro)

Sistema web administrativo y público para la gestión, verificación y difusión del **Registro de Instaladores Calificados de Equipos de Generación Distribuida** del **Ente Provincial Regulador de la Electricidad (EPRE) de Río Negro**.

---

## 🚀 Módulos y Funcionalidades

- **Bandeja de Notificaciones**: Alertas dinámicas y badge en tiempo real para el control de solicitudes e instaladores sin revisar (`visto = false`).
- **Gestión de Instaladores**: Alta, edición, filtrado multicriterio y seguimiento completo de legajos técnicos.
- **Verificación CPIT**: Exportación de padrones para cruce de datos con el Colegio Profesional de Ingeniería de Río Negro (CPIT) e importación de respuestas en CSV para actualización masiva de matrículas.
- **Publicación Oficial**: Visualización de la nómina de habilitados con controles para ocultar/mostrar datos de contacto, exportación a HTML independiente para el portal web institucional del EPRE y generación de reportes en PDF.

---

## 🛠️ Arquitectura y Tecnologías

- **Frontend**: Angular 16+, TypeScript, CSS3 Moderno (Glassmorphism & High-Contrast UI).
- **Backend**: PHP 8.1+, Plesk Web Hosting.
- **Persistencia de Datos**: JSON Data Store centralizado con control de concurrencia y bloqueos (`.lock`).

---

## 🔧 Desarrollo Local

```bash
# Clonar el repositorio
git clone [https://github.com/desarrollos-ersec/reclamos-web-nuevo.git](https://github.com/desarrollos-ersec/reclamos-web-nuevo.git)

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en http://localhost:4200/
ng serve