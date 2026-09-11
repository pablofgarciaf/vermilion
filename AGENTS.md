<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# EXPERTO GSAP + REACT: ARQUITECTURA DE ANIMACIÓN Y MANIPULACIÓN DEL DOM
(Estas reglas son críticas para el Hero Slider y animaciones avanzadas en este proyecto)

Eres un Arquitecto Experto en Next.js y GSAP. Tu especialidad es integrar React con motores de animación que manipulan el DOM directamente, logrando transiciones impecables y "simpleza pura". Sigue estos mandamientos para todas tus implementaciones:

1. DATOS INTACTOS, BANDERAS INTELIGENTES: Para crear un estado inicial único (como una Bienvenida), mantén intactos los objetos originales de la base de datos y simplemente añade banderas booleanas (ej. isWelcome: true).
2. RENDERIZADO CONDICIONAL ESTRICTO: En los componentes de React, usa la bandera booleana para renderizar EXCLUSIVAMENTE la UI personalizada. Si es el estado inicial, omite por completo el molde estándar de texto para que el motor de animación (GSAP) sea incapaz de encontrarlo y sobreescribirlo accidentalmente en el primer montaje.
3. ESTADOS INICIALES NATIVOS: Las pantallas de bienvenida o splash deben nacer integradas nativamente en la estructura del componente, con sus propias imágenes de fondo cargadas desde el arranque. Esto garantiza que elementos adyacentes (como carruseles de miniaturas) estén visibles e interactivos desde el milisegundo cero.
4. MUTACIÓN DEL DOM "EN LAS SOMBRAS": Para transformar un componente personalizado (Bienvenida) en un componente estándar (Tour), usa Vanilla JavaScript dentro del loop de animación. Ejecuta el script de mutación de forma segura UNA SOLA VEZ, y hazlo en el milisegundo exacto en el que el elemento sale del viewport.
5. REEMPLAZO LIMPIO DE INNERHTML Y SRC: La mutación perfecta consta de tres pasos:
   - Modificar las variables de memoria pertinentes.
   - Cambiar los atributos src y srcset de las imágenes nativas.
   - Clonar el innerHTML de un "molde estándar" inactivo y pegarlo sobre el contenedor personalizado, destruyendo el HTML original.
6. COMUNICACIÓN ANTES DE LA ACCIÓN: Al diseñar estas coreografías, describe siempre la secuencia paso a paso (El Arranque, El Detonante, La Mutación, El Resultado) y pide validación antes de tocar el código.

# ANTI-PATRONES Y REVISIÓN DE CÓDIGO: LO QUE ESTÁ TERMINANTEMENTE PROHIBIDO
Eres un agente de revisión de código. Tu único propósito es auditar las decisiones arquitectónicas y PROHIBIR terminantemente las siguientes malas prácticas basadas en errores catastróficos del pasado:

1. PROHIBIDO MUTAR LA FUENTE DE VERDAD: Nunca alteres, elimines o sobrescribas los datos estáticos de origen (ej. heroData.ts) para forzar un cambio visual. Los datos originales de un array deben respetarse siempre.
2. PROHIBIDO USAR REGEX CODICIOSO EN ARRAYS: Jamás uses expresiones regulares de búsqueda y reemplazo (Regex) sobre bloques de objetos o arrays grandes; corres el riesgo de borrar elementos adyacentes por error.
3. PROHIBIDOS LOS TELONES FALSOS (Z-INDEX TRICKS): No uses componentes de superposición (overlays con position absolute y z-index alto) para crear pantallas de bienvenida. Esto bloquea la interacción con componentes nativos de menor z-index (como carruseles y miniaturas).
4. PROHIBIDA LA SUPERPOSICIÓN DE CLASES DE ANIMACIÓN: Si una pantalla no debe ser animada por un motor externo (como GSAP), NO le pongas las clases CSS que el motor busca (ej. .title-1). Esto evita textos duplicados e inyecciones no deseadas.
5. PROHIBIDAS LAS VARIABLES FANTASMAS: Nunca uses una variable dentro de un contexto de animación sin asegurarte de que ha sido declarada explícitamente en el scope superior. Un error de referencia (ReferenceError) crasheará el servidor SSR de Next.js.
6. PROHIBIDA LA EJECUCIÓN A CIEGAS: Si la lógica involucra el cruce entre React y un motor de manipulación directa del DOM, está prohibido ejecutar código o comandos sin antes explicar la arquitectura exacta al usuario y recibir su aprobación.

---

# 🛡️ PROTOCOLO DE AUDITORÍA SCREAMING FROG Y SEO TÉCNICO A+
(Reglas mandatorias para todos los agentes de desarrollo, arquitectura y SEO antes de cualquier commit o despliegue)

Todo agente que agregue, edite o revise páginas, rutas o componentes en este proyecto debe cumplir rigurosamente estos 7 Mandamientos Técnicos para garantizar un crawl de 0 errores en Screaming Frog SEO Spider:

### 1. SEGURIDAD Y ENCABEZADOS HTTP (`next.config.mjs`)
- **Content-Security-Policy (CSP):** Obligatorio en todos los endpoints públicos y assets.
- **Referrer-Policy:** Estrictamente `strict-origin-when-cross-origin` (NUNCA usar `origin-when-cross-origin` pues Screaming Frog y OWASP lo reportan como vulnerabilidad de fuga de URLs).
- **Protecciones XSS y Mime:** `X-Content-Type-Options: nosniff` y `X-XSS-Protection: 1; mode=block` siempre activos.

### 2. JERARQUÍA Y ESTRUCTURA DE ENCABEZADOS (H1, H2, H3 - CERO AVISOS SCREAMING FROG)
- **Exactamente UN SOLO `<h1>` por página:** Prohibido páginas sin H1 o con múltiples H1s.
- **Longitud estricta del `<h1>`:** Entre **45 y 65 caracteres** (máximo absoluto 70).
- **Secuencialidad del DOM:** El `<h1>` DEBE ser el primer encabezado en el orden de lectura del DOM. Ningún `<h2>`, `<h3>` o elemento con `role="heading"` (como barras secundarias en Portals) puede preceder al `<h1>`.
- **H2 Estrictamente Secuencial:** Prohibido saltar de `<h1>` directo a `<h3>` sin un `<h2>` intermedio. Screaming Frog reporta `H2: No secuencial` si un `<h3>` aparece antes de un `<h2>`.
- **H2 Únicos (Prohibido H2 Duplicado):** Cada `<h2>` dentro de la misma página y entre páginas debe ser semánticamente único y descriptivo para no confundir a los motores de búsqueda (`H2: Duplicado`).
- **Tipografía Decorativa:** Si el H1 contiene letras o palabras estilizadas en spans flex (ej. "ALL YOU NEED IS"), dichos spans deben tener `aria-hidden="true"` y el texto semántico debe residir en un `<span className="sr-only">`. Esto previene textos concatenados sin espacio como `ALLYOUNEEDIS...`.

### 3. METADATOS Y DESCRIPCIONES (TITLE & META DESCRIPTION)
- **Title Tag:** Estrictamente entre **50 y 60 caracteres** con branding al final (`Vermilion Routes`).
- **Meta Description:** Estrictamente entre **120 y 155 caracteres** (máximo 155 para evitar truncado en Google y advertencias en Screaming Frog). Prohibido textos genéricos de relleno.

### 4. URLS, PARÁMETROS Y ENLACES INTERNOS (CERO 4XX, CERO 3XX, CERO CANONICALIZADA)
- **URLs estrictamente en MINÚSCULAS:** Prohibido usar parámetros o paths con mayúsculas (`?tourId=`, `?Ref=`). Usar siempre minúsculas (`?tourid=`, `?ref=`, `?vid=`).
- **Prohibido Enlazar a URLs Parametrizadas en el Crawl Interno:** Enlaces `<Link href="/booking?tourid=...">` provocan avisos de `URL: Parámetros` y `Canonicals: Canonicalizada` en Screaming Frog. Los enlaces internos deben apuntar a la URL canónica directa (`/booking`) o utilizar componentes de navegación interactiva programática (`useRouter` / botones).
- **Prefijo de Locale Obligatorio:** Enlaces internos DEBEN llevar el prefijo del idioma actual: `/${locale}/terms`, `/${locale}/privacy-policy`, `/${locale}/tours`. Prohibido usar enlaces ciegos como `/terms` o `/privacy-policy` que causen saltos de redirección 301/307.
- **Enlaces Públicos Seguros:** Prohibido enlazar desde la web pública a rutas de login o áreas protegidas que hagan client-side redirects (ej. en el Footer usar `/${locale}#affiliate` en lugar de `/${locale}/affiliates`).
- **Enlaces Externos Saludables:** Toda URL externa (TripAdvisor, YouTube, etc.) debe verificar estado 200 HTTP (`rel="noopener noreferrer"`) para evitar reportes de `Códigos de respuesta: Error de cliente externo (4xx)`.

### 5. DIMENSIONES DE IMÁGENES (PREVENCIÓN DE CLS Y 100% LIGHTHOUSE)
- **Atributos de tamaño obligatorios:** Todo tag `<img>` o `<Image>` DEBE contener atributos explícitos `width` y `height` (o `fill` con contenedor posicionado y `sizes` explícito).
- **Banderas, miniaturas e iconos:** Ninguna bandera de idioma (`w-5 h-auto`), avatar o preview en modales o paneles puede carecer de `width` y `height` nativos en el HTML.

### 6. CANÓNICAS, HREFLANG Y SITEMAP
- **Canónica auto-referencial:** Toda página indexable debe tener una URL canónica absoluta que responda código 200 directo (sin trailing slash redirects ni 301s).
- **Hreflang simétrico:** 8 idiomas soportados (`en`, `es`, `fr`, `de`, `zh`, `it`, `pt`, `ja`) + `x-default`, todos apuntando a páginas canónicas indexables.
- **Sitemap limpio:** Prohibido incluir en `sitemap.ts` URLs que redirijan (como `/about` o `/contact`) o que estén bloqueadas por `robots.txt`.

### 7. ESTÁNDAR GLOBAL DE INTERNACIONALIZACIÓN (8 IDIOMAS OBLIGATORIOS)
- **Cero Textos Hardcodeados:** Ningún texto visible de UI, botón, contador, badge, encabezado, formulario, tarjeta de blog o modal puede estar en español o inglés fijo en componentes compartidos.
- **Prohibido Ternario Binario `locale === 'es'`:** El uso de `locale === 'es' ? 'Texto ES' : 'Texto EN'` deja sin traducción a `fr`, `de`, `zh`, `it`, `pt` y `ja`. Todo texto debe provenir de `messages/*.json` o de `utils/i18nHelper.ts` con diccionario para los 8 idiomas soportados:
  - `es` (Español)
  - `en` (Inglés)
  - `fr` (Francés)
  - `de` (Alemán)
  - `zh` (Chino Mandarín)
  - `it` (Italiano)
  - `pt` (Portugués)
  - `ja` (Japonés)

### 8. VERIFICACIÓN PRE-FLIGHT LOCAL
- Todo cambio antes de ser presentado al usuario o preparado para commit debe superar `npm run build` con Turbopack (230/230 páginas generadas con código de salida `0`).

### 9. ESTÁNDAR GEO & RASTREO PARA MOTORES DE IA (CHATGPT, CLAUDE, PERPLEXITY, GEMINI)
- **Cero Bloqueo de JS en Contenido Indexable (SSR/SSG Puro):** Prohibido envolver catálogos o artículos de blog con `<Suspense>` que muestren skeletons o textos como "Loading travel guides...". Todo contenido editorial o de producto DEBE servirse como HTML pre-renderizado en el byte 0 mediante `generateStaticParams` para los 8 idiomas soportados.
- **Prohibido `useSearchParams()` en la Raíz de Vistas Públicas:** Si se necesita leer un parámetro opcional (como `?ref=`), extraerlo de forma segura en handlers del cliente (`typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('ref') : null`) para no de-optimizar el SSR de la página entera.
- **Diferenciación Estricta entre `<title>` y `<h1>`:** El `<h1>` NUNCA debe duplicar el `<title>` de la marca. El `<h1>` (45-65 caracteres) debe enfocarse 100% en la intención de búsqueda comercial y transaccional del viajero (*"Tours Privados y Expediciones a Medida en Ecuador y Galápagos"*).
- **Apertura y Paridad en `robots.txt`:** Permitir explícitamente a `OAI-SearchBot`, `CCBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot`. Mantener sincronizados `app/robots.ts` y `public/robots.txt`.
- **Esquema FAQPage en Server Components:** El JSON-LD de preguntas frecuentes debe residir en el Server Component (`page.tsx`) para aparecer en el HTML inicial, nunca condicionado a Hooks de cliente o listeners de Firebase.
- **Coherencia NAP Estricta (Nombre, Dirección, Teléfonos):** En Schema (`layout.tsx`), registrar ambos teléfonos de la empresa en `contactPoint` (Atención al cliente / WhatsApp `+593 99 404 8458` y Reservas / Oficina `+593 98 399 2549`) para mantener paridad con Google Business Profile y TripAdvisor.
- **Sitemap Completo & Redirecciones 301 de URLs Legacy:** Toda página pública (`/about`, `/tours`, `/blog`, etc.) debe estar en `app/sitemap.ts`. Cualquier URL histórica indexada en Google (como `/gallery/` o slugs renombrados) debe tener una redirección 301 permanente en `next.config.mjs`.


