# C01: Components
Los componentes en Astro son bloques de construcción fundamentales de la interfaz. Son piezas modulares, encapsuladas y reutilizables de código (HTML, CSS, y Lógica) que conforman visualmente el sitio<br>
Si un **Layout** es el edificio o la estructura base, los **Componentes** son los muebles que se colocan dentro (botones, tarjetas, menús, insignias).
- **Reutilización total**: Evitan duplicar código. En lugar de escribir manualmente el HTML de 6 proyectos distintos, se crea un solo componente `ProjectCard.astro` y se llama 6 veces.
- **Propiedades (Props)**: Pueden recibir datos dinámicos. Al usar el componente, se le pasa argumentos (como título, descripción o imagen) para que renderice información distinta cada vez.
- **Cero JavaScript por defecto**: Un componente `.astro` se renderiza en el servidor como puro HTML estático. No envía peso extra al navegador, haciendo la web ultrarrápida.
- **Agnósticos (Arquitectura de Islas)**: Un componente no tiene que ser estrictamente de Astro. Se puede usar componentes de React (`.jsx`), Vue o Svelte en la carpeta `src/components/` y Astro los tratará como "islas" interactivas.
# C02: Layouts
Los Layouts en Astro son plantillas que se usan para proporcioanr una estructura reutilizable, como una plantilla de página. <br>
Convencionalmente se usa el termino "`layout`" para proporcionar elementos compartidos en la irtefaz de usuario por medio de páginas, como ecabezados, barras de navegación y pies de página.
El BaseLayout.astro actúa como el esqueleto o envoltorio común de la aplicación. Todo lo que se repite página tras página (como el Header, la barra de navegación, el menú lateral o el Footer) vive ahí, mientras que el contenido único de cada vista se inyecta dinámicamente en el medio mediante un <slot />.
```astro
---
// src/layouts/BaseLayout.astro
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';

// Puedes recibir propiedades (props) si necesitas títulos dinámicos
interface Props {
  title?: string;
}

const { title = "Mi Portafolio Profesional" } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col">
    
    <!-- 1. Encabezado / Barra de navegación global -->
    <Navbar />

    <!-- 2. Contenido dinámico de cada página (aquí se inyecta el index.astro, proyectos, etc.) -->
    <main class="max-w-4xl mx-auto px-4 py-8 w-full">
      <slot />
    </main>

    <!-- 3. Pie de página global -->
    <Footer />

  </body>
</html>
```
.
# C03: Assets
# C04: Pages
# C05: Slot
Un `<slot />` o ("ranura) en Astro es un marcador de posición donde se inyecta el contenido hijo que se pasa dentro de un componente o plantilla. Es el mecanismo fundamental para crear **plantillas reutilizables (Layouts)** o **contenedores flexibles**. <br>
Funciona como un punto de entrada único para cualquier elemento HTML o contenido que se coloque dentro de las etiquetas del Layout.<br> 
Ejemplo:<br>
`src/layouts/BaseLayout.astro` (El Contenedor):
```Astro
---
---
<html lang="es">
  <body>
    <header><nav>Mi Navegación</nav></header>

    <!-- Astro insertará aquí lo que pases dentro de <BaseLayout> -->
    <main>
      <slot /> 
    </main>

    <footer>Mi Pie de Página</footer>
  </body>
</html>
```
Luego `src/pages/index.astro` (Uso):
```Astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
  <!-- Todo esto se inyecta exactamente donde está el <slot /> -->
  <h1>Página de Inicio</h1>
  <p>Bienvenido a mi portafolio.</p>
</BaseLayout>
```
<hr>

**Tambien están los Slots con Nombre**. (`Named Slots`)<br>
Si un Layout necesita recibir contenido en múltiples lugares dieferentes (por ejemplo, un contenido para el cuerpo y otro para una barra lateral), se usaria el atributo `name.`<br>
`src/layouts/DosColumnas.astro`:
```Astro
---
---
<div class="grid grid-cols-3 gap-4">
  <aside class="col-span-1">
    <!-- Asigna un nombre al slot -->
    <slot name="sidebar" />
  </aside>

  <main class="col-span-2">
    <!-- Slot por defecto para el contenido principal -->
    <slot />
  </main>
</div>
```
`src/pages/index.astro`(Uso):
```Astro
---
import DosColumnas from '../layouts/DosColumnas.astro';
---

<DosColumnas>
  <!-- Le indicas a qué slot enviar este contenido con slot="..." -->
  <ul slot="sidebar">
    <li>Enlace 1</li>
    <li>Enlace 2</li>
  </ul>

  <!-- Esto va al <slot /> por defecto -->
  <h1>Contenido Principal</h1>
</DosColumnas>
```

<hr>

**Slots con contenido por Defecto (Fallback)**<br>
Se puede poner HTML dentro del propio `<slot>` para que se muestre en caso de que la página no le pase nada.
```astro
<slot name="header">
  <!-- Si la página no envía un slot="header", se mostrará esto: -->
  <h2>Título genérico por defecto</h2>
</slot>
```
<hr>

**EL Slot es el "hueco" de la plantilla que se espera a ser rellenado por el contenido de las páginas.**
# C06: Section Container
Para evitar repetir una y otra vez las clases de Tailwind para controlar los márgenes, ancho y el padding en cada sección (Experience, Proyects, About, etc).
```astro
---
interface Props {
  id?: string;
  class?: string;
}

const { id, class: className } = Astro.props;
---

<section 
  id={id} 
  class:list={[
    "w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16",
    className
  ]}
>
  <slot />
</section>
```
La directiva `class:list` de Astro fusiona de forma segura las clases por defecto de la sección con cualquier clase extra que se pase desde fuera (por ejemplo: `<SectionContainer class="bg-slate-800/50">`), resolviendo problemas de espacios automáticamente.
# C
# C
# C
# C
# C
# C
# C
# C
# C
# C