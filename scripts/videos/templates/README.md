# Templates de Video

Esta carpeta contiene las composiciones HyperFrames reutilizables como templates.

## Cómo funciona

Cada template es una carpeta con un `index.html` que contiene marcadores `{{variable}}`:

```
templates/
  bf-announcement/
    index.html   ← composición HyperFrames con {{headline}}, {{deadline}}, etc.
  bf-countdown/
    index.html
  bf-testimonial/
    index.html
```

El script `../generate-from-template.js` reemplaza los marcadores con los valores reales.

## Cómo añadir un template

1. Crear la composición con HyperFrames (requiere Sonnet + skills hyperframes-core/audio)
2. En el HTML, reemplazar los textos variables por `{{nombre_variable}}`
3. Guardar el `index.html` en una carpeta nueva aquí
4. Documentar las variables en `docs/runbooks/create-video-simple.md`

## Templates disponibles

| Template | Variables | Descripción |
|----------|-----------|-------------|
| *(pendiente)* | — | Los templates BF se crearon en sesión 88bda649 en el scratchpad. Recrear con HyperFrames cuando se necesiten. |

## Sesión de referencia

Los 3 templates de Black Friday fueron creados en la sesión `88bda649-c505-4356-9b1e-7b0c9b423286` (2026-11-04).  
Los archivos originales estaban en el scratchpad (sesión-específico, ya expirado).  
Para recrearlos: pedir a Sonnet con las skills `hyperframes-core` + `hyperframes-audio` + `media-use`.
