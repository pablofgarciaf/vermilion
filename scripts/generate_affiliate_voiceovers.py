import asyncio
import edge_tts

scripts = {
    "01_quienes_somos": (
        "¿Quién es Vermilion Routes? Somos el Operador Boutique DMC líder en Ecuador y Galápagos, "
        "con licencia oficial del Ministerio de Turismo y calificación perfecta de 5 estrellas en TripAdvisor. "
        "No vendemos paquetes masivos ni intermediamos con terceros. "
        "Diseñamos expediciones privadas hechas a mano, respaldadas por naturalistas bilingües certificados "
        "y un equipo de conserjería disponible 24/7. "
        "Para nuestros afiliados y asesores, ofrecemos total protección al cliente, "
        "contrato fiduciario y hasta 15% de comisión neta garantizada."
    ),
    "02_servicios": (
        "Descubre el portafolio de servicios de Vermilion Routes. "
        "Ofrecemos cuatro mundos en un solo destino: las Islas Galápagos en yates privados boutique, "
        "la majestuosa Avenida de los Volcanes en los Andes, la Amazonía profunda en lodges de ultralujo, "
        "y la Costa del Pacífico. "
        "Gestionamos la logística de guante blanco de inicio a fin: "
        "vuelos privados, traslados VIP, permisos de parques nacionales y gastronomía de autor. "
        "Tus clientes viajan con privacidad absoluta y tú ganas con cada reserva."
    ),
    "03_galapagos": (
        "Galápagos con Vermilion Routes: la experiencia definitiva en el archipiélago encantado. "
        "Acceso exclusivo a fondeaderos sin multitudes, encuentros íntimos con tortugas gigantes, "
        "lobos marinos y piqueros de patas azules, guiados por biólogos y naturalistas de élite. "
        "Tarifas transparentes desde 1,050 dólares con vuelos y tasas de reserva protegidas. "
        "Como afiliado, tienes a tu disposición itinerarios de marca blanca listos para cotizar "
        "y soporte directo en Estados Unidos y Latinoamérica. Únete a nuestra red de asesores."
    )
}

async def generate_voiceovers():
    # Spanish Latin America luxury voice (es-EC-LuisNeural or es-MX-JorgeNeural or es-US-AlonsoNeural)
    voice = "es-MX-JorgeNeural"
    for name, text in scripts.items():
        output_file = f"C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/Afiliados/{name}_locucion.mp3"
        print(f"Generating voice for {name}...")
        communicate = edge_tts.Communicate(text, voice=voice, rate="-2%", pitch="+0Hz")
        await communicate.save(output_file)
        print(f"Saved {output_file}")

if __name__ == "__main__":
    asyncio.run(generate_voiceovers())
