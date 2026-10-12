---
name: videos
description: Videos verticales de marca para redes (Modulares GM, EnergyEngine, Vermilion Routes y cualquier empresa con perfil). Usar cuando pidan "haz un video", "reel", "video para TikTok", "video para Instagram / Facebook", "Shorts", "story en video", "anuncio o promo en video", "video con voz", "voz de Jorge" o "video mudo".
model: sonnet
---

# videos — reels de marca

Un solo script hace todo el trabajo: `scripts/make_reel.py` (Pillow + ffmpeg); se ejecuta, no hace falta leerlo. Cada video se define en un spec JSON. No reescribas el script para un video puntual: si falta algo, mejora el script para todos.

## 0. Elegir la marca

Cada empresa tiene un perfil en `assets/brands/<id>/`: `brand.json` y `logo.png`. Lista `assets/brands/*/brand.json` para ver las marcas. Si el pedido o la carpeta actual no dejan claro de qué empresa es el video, pregunta. Lee el `brand.json` de la marca: es la única fuente de su mercado, su voz, su contacto, dónde están sus fotos (`photos`) y de dónde salen sus datos (`facts`).

Para una empresa nueva, crea `assets/brands/<id>/` con:

- un `logo.png` transparente que se vea sobre fondo oscuro;
- un `brand.json` con los mismos campos que los existentes, con colores y fuentes tomados de su sitio.

Las fuentes van en `assets/fonts/`, con su licencia OFL.

Listo cuando: sabes el `id` de la marca y leíste su `brand.json`. Si la marca es nueva, además el ejemplo apuntado a ella (`"brand": "<id>"`) se renderiza con `--size 720` sin errores.

## 1. Elegir las fotos

- Usa fotos reales de la empresa, del lugar que indica `photos` o de las que mande el usuario. No uses fotos de stock: el cliente compra porque ve trabajos y lugares reales.
- Si `photos` o `facts` nombran un repo que no está en la carpeta actual, pide su ruta.
- Abre cada candidata con Read antes de elegirla. Descarta portadas, logos, páginas de texto y fotos borrosas.
- Elige 3–5 fotos. Las verticales llenan la pantalla. Las horizontales se ponen solas sobre un fondo desenfocado.

Listo cuando: tienes 3–5 rutas y viste cada imagen.

## 2. Escribir el spec

Copia `assets/ejemplo-navidad.json`, un ejemplo de `mgm`, a `~/Videos/<marca>/` o a la carpeta scratchpad de la sesión: fuera de git. Edítalo con la marca, las fotos y la campaña vigente. Usa rutas absolutas en `photo`; las del ejemplo son relativas a la raíz del repo `modularesgm`.

| Campo | Qué es | Regla o valor por defecto |
|---|---|---|
| `brand` | `id` de `assets/brands/` o ruta a una carpeta con `brand.json` | obligatorio |
| `scenes[].photo` | ruta absoluta o relativa a la carpeta actual o a la del spec | obligatoria |
| `scenes[].eyebrow` | etiqueta pequeña en el color de acento | ≤ 3 palabras |
| `scenes[].title` | frase grande, obligatoria | ≤ 7 palabras y máximo 4 líneas en el preview |
| `scenes[].say` | lo que dice la voz en esa escena | 1 frase, ≤ 15 palabras; la escena se alarga sola |
| `scenes[].seconds` | duración mínima de esa escena | opcional |
| `end` | cierre obligatorio: `title`, `subtitle`, `cta`, `footer`, `say` | `cta` = "WhatsApp" + `contact.whatsapp` de la marca; `footer` = `contact.web` + nombre; `say` hasta 2 frases |
| `scene_seconds` | duración mínima de todas las escenas | 2.8 |
| `logo`, `colors` | cambian el logo o algún color de la marca solo en este video; `"logo": null` lo quita | opcional |
| `audio.voice`, `audio.rate`, `audio.volume` | voz de edge-tts, velocidad y volumen | `voice` de la marca, `+5%`, `+0%` |
| `audio.music` | `"auto"` (música original generada, sin derechos), ruta a un MP3 propio, u omitir | |
| `audio.music_volume` | volumen de la música; baja sola cuando habla la voz | 0.35 |

Reglas del texto:

- Escribe títulos y `say` en el idioma del `market` de la marca; si cambias de idioma, cambia también `audio.voice`. Una voz en inglés que lee español suena a error.
- La primera escena es el gancho: una pregunta o un beneficio. TikTok decide en 1–2 segundos si sigue mostrando el video.
- Saca precios, fechas y promociones de las fuentes en `facts`. Una oferta inventada se convierte en un reclamo por WhatsApp.
- En `say` no dictes el teléfono, porque la voz lo lee como una cifra ("noventa y seis..."). Invita a escribir por WhatsApp en el idioma del `market` y deja el número en pantalla. Escribe en letras las fechas que deben sonar naturales ("trece de noviembre").
- Sin `say` en ninguna escena y sin `audio.music`, el video sale solo mudo.

Listo cuando: `python3 -m json.tool <spec>` no da error, cada `title` de escena tiene ≤ 7 palabras y cada dato sale de `facts`.

## 3. Renderizar

```bash
python3 ~/.claude/skills/videos/scripts/make_reel.py <spec>.json ~/Videos/<marca>/<nombre>.mp4 --preview
```

Requisitos: Python 3.9+, `pip install pillow numpy edge-tts` y ffmpeg (en Windows: `winget install Gyan.FFmpeg`); para la voz de respaldo, `pip install piper-tts`. En Windows el comando es `python` y la ruta es `%USERPROFILE%\.claude\skills\videos\scripts\make_reel.py`. Un video de 20 s a 1080x1920 tarda alrededor de 1 minuto: dale a la orden un timeout de 10 minutos. Para probar el texto, usa `--size 720`, que es más rápido.

- Con audio salen tres archivos: `<nombre>.mp4` (con sonido), `<nombre>-mudo.mp4` y `<nombre>-preview.jpg` (un cuadro por escena).
- Sin audio solo salen `<nombre>.mp4` (mudo) y el preview.
- Usa `--voice-engine none` o `--no-music` para quitar la voz o la música sin tocar el spec.

Voz: `auto` usa la voz de Microsoft que dice `voice` en `brand.json` (vía edge-tts). Esa voz necesita acceso a `speech.platform.bing.com`.

- Sin ese acceso, como en la nube de Claude Code, usa la voz de respaldo Piper del mismo idioma; solo hay en español e inglés. Piper suena más robótica, y la de español tiene acento de España. La primera vez descarga 19–58 MB de github.com, y después funciona sin internet.
- El log resume la voz en una línea: `narración: N de M escenas (voz: edge)`. `edge` es la voz de Microsoft.
- Si N es menor que M, o si aparece `ATENCIÓN`, el video quedó sin narrar en parte o mezcla dos voces. No lo entregues así: repite el render, fuerza una sola voz con `--voice-engine piper`, o avisa al usuario.
- Si salió `piper`, avisa al usuario y ofrece dos caminos: renderizar en su PC, o permitir `speech.platform.bing.com` en la política de red del entorno.

Listo cuando: los archivos existen y, si el spec tiene `say` y no usaste `--voice-engine none`, el log muestra `narración: M de M` con una sola voz y sin `ATENCIÓN`.

## 4. Revisar

- Abre `<nombre>-preview.jpg` con Read. Comprueba que ningún título esté cortado, que el texto se lea sobre la foto y que el logo se vea en el cierre. Si una foto clara apaga el texto, cambia la foto o acorta el título.
- La duración que muestra el log debe estar entre 12 y 30 s. Los videos más largos pierden espectadores antes del cierre con WhatsApp. Si se pasa, acorta los `say` o quita una escena. Si se queda corto, sube `scene_seconds` o agrega una escena.

Listo cuando: viste el preview, la duración está entre 12 y 30 s, y corregiste cada problema con un nuevo render.

## 5. Entregar

- Envía los MP4 con SendUserFile. Si esa herramienta no existe, da sus rutas.
- Junto al video, entrega el texto del post en el idioma del `market`:
  - una línea de gancho;
  - el llamado a la acción por WhatsApp con `contact.whatsapp`;
  - 3–5 hashtags del mercado de la marca (ciudad, país y servicio).
- Dile al usuario cuándo usar cada versión:
  - La versión muda va con un sonido en tendencia agregado dentro de TikTok, porque los sonidos de la app dan más alcance.
  - La versión con voz va tal cual. Si quiere, puede sumar un sonido en tendencia a bajo volumen.
- No subas los MP4 a git: inflan el repo y cada deploy.

Listo cuando el usuario recibió:

- cada MP4 que generó el render (el con sonido y el mudo, o solo el mudo si no había audio);
- el texto del post;
- qué voz se usó.
