# PgNumber.js

![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)
![bundle size](https://img.shields.io/badge/size-%3C%202KB-brightgreen.svg)
![js](https://img.shields.io/badge/vanilla-JS-yellow.svg)

Librería en **Vanilla JavaScript** (ES6+) ultraligera (<2KB) y sin dependencias para formatear, restringir y validar entradas numéricas en tiempo real sobre elementos ```<input>```.

---

## 📖 Tabla de Contenidos

- Características
- Instalación
- Uso Rápido
- Opciones de Configuración
- API y Métodos
- Eventos
- Casos de Uso
- Compatibilidad
- Licencia

---

## ✨ Características

- ⚡ **Ultraligera**: Menos de 2KB minificada.
- 🚀 **Zero Dependencies**: No requiere jQuery, Bootstrap JS ni frameworks adicionales.
- 🔄 **Delegación de Eventos Nativa**: Ideal para formularios dinámicos y tablas donde los inputs se agregan o eliminan en tiempo de ejecución.
- 🏷️ **Soporte HTML Data Attributes**: Configura el comportamiento directamente desde el HTML con atributos data-pgnumber-*.
- 🌐 **Soporte UMD**: Compatible con etiquetas ```<script>``` directas, CommonJS y módulos ES6.
- ♿ **Accesibilidad Integrada**: Mantiene el atributo type="text" o type="number" respetando la experiencia del usuario.

---

## ⚡ Instalación

### Inclusión Directa (HTML)

Descarga el archivo pgnumber.js o pgnumber.min.js e inclúyelo en tu archivo HTML:

```<script src="path/to/pgnumber.js"></script>```

### Importación Modular (ES6 / Bundlers)

Si utilizas un entorno de módulos o bundlers (Vite, Webpack, Rollup):

```import PgNumber from './pgnumber.js';```

---

## 🚀 Uso Rápido

### 1. Ejemplo Básico

Inicializa la librería pasando un selector CSS o una referencia HTML:
```
<input type="text" id="monto" placeholder="0.00" />

<script>
  new PgNumber('#monto', {
    decimals: 2,
    separator: '.',
    negative: false
  });
</script>
```
### 2. Uso con Delegación (Campos Dinámicos)

Escucha sobre un contenedor padre para dar soporte automático a filas o elementos agregados dinámicamente al DOM sin necesidad de re-inicializar la instancia:
```
<table id="tablaVentas">
  <tbody>
    <tr>
      <td><input type="text" class="precio-item" placeholder="0.00" /></td>
    </tr>
  </tbody>
</table>

<script>
  // Captura automáticamente nuevos <input class="precio-item"> agregados a la tabla
  new PgNumber('#tablaVentas', {
    selector: '.precio-item',
    decimals: 2,
    separator: '.'
  });
</script>
```
### 3. Configuración vía Atributos HTML data-*

Sobrescribe las opciones globales directamente desde la etiqueta HTML de cada input:
```
<input 
  type="text" 
  class="monto-custom" 
  data-pgnumber-decimals="4" 
  data-pgnumber-separator="," 
  data-pgnumber-negative="true" 
/>

<script>
  // Detecta y respeta automáticamente los atributos data-pgnumber-*
  new PgNumber('.monto-custom');
</script>
```
---

## ⚙️ Opciones de Configuración

| Propiedad JS | Atributo HTML Data | Tipo | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| selector | — | string | "" | Selector CSS interno para activar la delegación sobre elementos dinámicos. |
| decimals | data-pgnumber-decimals | number | 2 | Cantidad máxima de posiciones decimales permitidas. |
| separator | data-pgnumber-separator | string | "." | Carácter utilizado como separador decimal ("." o ","). |
| negative | data-pgnumber-negative | boolean | false | Permite o deshabilita el ingreso de números negativos (-). |
| parse | data-pgnumber-parse | boolean | true | Aplica normalización (toFixed) al perder el foco (blur). |
| selectize | data-pgnumber-selectize | boolean | true | Selecciona todo el texto automáticamente al ganar el foco (focus). |

---

## 🛠️ API y Métodos

### new PgNumber(target, [options])

Crea e inicializa una nueva instancia.

- **target**: Selector CSS (string), HTMLElement, NodeList o Array de elementos.
- **options**: (Opcional) Objeto con la configuración global de la instancia.

### instance.destroy()

Elimina todos los event listeners asociados y libera recursos en memoria:
```
const pg = new PgNumber('#monto');

// Al destruir la vista o el componente:
pg.destroy();
```
---

## 🔔 Eventos

PgNumber.js emite eventos nativos sobre el elemento ```<input>``` para integrar fácilmente con otras librerías o lógica de negocio:
```
const input = document.querySelector('#monto');

input.addEventListener('change', (e) => {
  console.log('Valor formateado final:', e.target.value);
});
```
---

## 🎯 Casos de Uso

1. **Sistemas Punto de Venta (POS)**: Control estricto de precios, cantidades y montos en tablas de detalle de venta.
2. **Formularios Financieros**: Entrada de importes, tasas de interés o tipo de cambio con precisión decimal configurable.
3. **Módulos de Inventario**: Validación de stock o pesos donde solo se permiten números positivos.

---

## 🌐 Compatibilidad

PgNumber.js utiliza JavaScript nativo (ES6) y no requiere ningún transpilador pesado:

- Chrome / Edge (todas las versiones modernas)
- Firefox (todas las versiones modernas)
- Safari 10+
- Opera

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Creado por **Wilfredo Nina Choquetarqui**.