# PgNumber.js

![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)
![bundle size](https://img.shields.io/badge/size-%3C%202KB-brightgreen.svg)

Librería en **Vanilla JavaScript** (ES6+) ultraligera (<2KB) y sin dependencias para formatear, restringir y validar entradas numéricas en tiempo real sobre elementos `<input>`.

---

## 📖 Tabla de Contenidos

- [Características](#-características)
- [Instalación](#-instalación)
- [Uso Rápido](#-uso-rápido)
  - [Ejemplo Básico](#ejemplo-básico)
  - [Uso con Delegación (Campos Dinámicos)](#uso-con-delegación-campos-dinámicos)
  - [Configuración vía Atributos HTML `data-*`](#configuración-vía-atributos-html-data-)
- [Opciones de Configuración](#%EF%B8%8F-opciones-de-configuración)
- [API y Métodos](#-api-y-métodos)
- [Licencia](#-licencia)

---

## ✨ Características

- ⚡ **Ultraligera**: Menos de 2KB minificada.
- 🚀 **Zero Dependencies**: No requiere jQuery, Bootstrap JS ni frameworks adicionales.
- 🔄 **Delegación de Eventos Nativa**: Ideal para formularios dinámicos y tablas donde los inputs se agregan o eliminan en tiempo de ejecución.
- 🏷️ **Soporte HTML Data Attributes**: Configura el comportamiento directamente desde el HTML con atributos `data-pgnumber-*`.
- 📦 **Soporte UMD**: Compatible con etiquetas `<script>` directas, CommonJS y módulos ES6.

---

## ⚡ Instalación

### 1. Inclusión Directa (HTML)

Descarga el archivo `pgnumber.js` e inclúyelo mediante etiqueta script estándar:

```html
<script src="pgnumber.js"></script>