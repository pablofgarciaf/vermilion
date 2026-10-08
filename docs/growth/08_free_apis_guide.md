# Cómo darme acceso a las herramientas gratuitas (sin pegar claves en el chat)

**Dónde se guardan:** en tu entorno de Claude Code (menú del entorno en la barra de título de la sesión → *Edit*). Ahí hay una sección de credenciales de red (*Network secrets / API credentials*) o variables de entorno. Dime el nombre de la variable y yo la leo. Nunca pegues una clave en el chat. Una sesión nueva recoge los cambios.

| Herramienta | Costo | Cómo obtener el acceso | Variable sugerida | Qué podré hacer |
|---|---|---|---|---|
| **Google Search Console** | Gratis | Google Cloud → proyecto nuevo → habilitar *Search Console API* → crear cuenta de servicio → descargar JSON → en Search Console, añadir el correo de la cuenta de servicio como usuario | `GSC_SERVICE_ACCOUNT_JSON` | Leer búsquedas, clics y posiciones |
| **GA4 Data API** | Gratis | Mismo proyecto → habilitar *Google Analytics Data API* → en GA4, Admin → Acceso a la propiedad → añadir la cuenta de servicio con rol *Lector* | misma variable + `GA4_PROPERTY_ID` | Informes de visitas y conversiones |
| **Tag Manager API** | Gratis | Mismo proyecto → habilitar *Tag Manager API* → dar permiso a la cuenta de servicio en el contenedor | misma variable | Revisar etiquetas |
| **Perfil de Negocio de Google** | Gratis, pero **con aprobación** | La API de Business Profile exige solicitar acceso a Google (formulario) y OAuth. Puede tardar días. Hasta entonces, pega los textos de `07_google_business_profile.md` a mano | — | Publicaciones, reseñas, servicios (tras aprobación) |
| **Meta (Facebook/Instagram/WhatsApp)** | API gratuita; los anuncios cuestan | developers.facebook.com → crear app → en Business Manager crear usuario del sistema y asignarle Página, Instagram, cuenta publicitaria y WhatsApp → generar token | `META_SYSTEM_USER_TOKEN`, `META_AD_ACCOUNT_ID` | Publicar, leer métricas, preparar campañas (con tu OK) |
| **WhatsApp Cloud API** | Mensajes de servicio gratuitos; las plantillas fuera de 24 h se cobran (verifica la tarifa vigente) | En la app de Meta, añadir producto WhatsApp y verificar el número | `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TOKEN` | Recibir leads al CRM |
| **Microsoft Clarity** | Gratis | Proyecto → Settings → Data export → token | `CLARITY_API_TOKEN` | Mapas de calor y grabaciones |
| **Bing Webmaster** | Gratis | Webmaster Tools → API access → clave | `BING_WEBMASTER_API_KEY` | Indexación en Bing |
| **Gemini API** | Plan gratuito con límites | Google AI Studio → Get API key | `GOOGLE_GENAI_API_KEY` | Genkit |

## Sobre el Perfil de Negocio
Google no entrega una clave simple: exige aprobación del acceso a la API. Por eso hoy lo más rápido es que pegues los textos del archivo 07. Si quieres gestionarlo conmigo más adelante, aplicamos al acceso en paralelo.

## Seguridad
Usa **cuentas de servicio de solo lectura** cuando sea posible, un proyecto de Google Cloud solo para Vermilion, y revoca el acceso cuando no lo necesites.
