#!/usr/bin/env node

/**
 * Generate a beautiful, professional marketing PDF for Vermilion Routes
 * Usage: node scripts/generate-marketing-pdf.mjs
 * Output: public/Vermilion_Routes_Tours_Catalog.pdf
 */

import { jsPDF } from 'jspdf';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Tour data (simplified from mock.ts)
const tours = [
  {
    title: 'Galapagos Encounter: 6-Day Expedition',
    destination: 'Galápagos',
    duration: '6 days / 5 nights',
    price: '$1,790',
    price4Star: '$2,199',
    highlights: [
      'Private Quito Airport Transfers',
      'Twin Craters & Primicias Tortoise Ranch',
      'Full-Day Isabela Excursion & Tintoreras Snorkeling',
      'Flamingo Lagoon & Tortoise Breeding Center',
      'La Lobería Sea Lion Colony & Las Grietas'
    ],
    includes: [
      'Accommodation (3★ or 4★ hotel)',
      'Private airport transfers',
      'Domestic flights (Quito–Baltra–Quito)',
      'All guided island visits',
      'Level III certified naturalist guides',
      'Buffet/Continental breakfast',
      'Set-menu lunches',
      'Snorkeling equipment',
      'Comprehensive transportation'
    ]
  },
  {
    title: 'Amazon Chocó Rainforest: 5-Day Immersion',
    destination: 'Amazon',
    duration: '5 days / 4 nights',
    price: '$1,150',
    price4Star: '$1,550',
    highlights: [
      'Private Quito Airport Transfers',
      'Emerald Forest Lodge Accommodation',
      'Wildlife spotting: Pink River Dolphins & Jaguars',
      'Canopy walkway & night forest treks',
      'Indigenous Kichwa community interaction'
    ],
    includes: [
      'Eco-lodge accommodation',
      'Private airport transfers',
      'All guided jungle activities',
      'Certified naturalist guides',
      'Full board meals',
      'Kayak equipment',
      'Night vision binoculars'
    ]
  },
  {
    title: 'Quilotoa Loop & Cloud Forest: 4-Day Adventure',
    destination: 'Ecuador Highlands',
    duration: '4 days / 3 nights',
    price: '$950',
    price4Star: '$1,350',
    highlights: [
      'Private Quito Airport Transfers',
      'Quilotoa Crater Lake (highest point)',
      'Indigenous market visits',
      'Cloud forest trekking',
      'Traditional weaving workshops'
    ],
    includes: [
      'Boutique hotel accommodation',
      'Private airport transfers',
      'All guided excursions',
      'Expert naturalist guides',
      'Full board meals',
      'Market tour guides',
      'Photography support'
    ]
  },
  {
    title: 'Ecuador + Galápagos Combined: 10-Day Grand Tour',
    destination: 'Ecuador & Galápagos',
    duration: '10 days / 9 nights',
    price: '$2,290',
    price4Star: '$3,190',
    highlights: [
      'Private Quito Airport Transfers',
      'Ecuador highlights: Cloud forest, Indigenous culture',
      'Galápagos: Island hopping & wildlife encounters',
      'All-inclusive meals & guided experiences',
      'Expert naturalists throughout'
    ],
    includes: [
      'Premium hotel accommodations',
      'All airport transfers',
      'All domestic flights',
      'All guided activities',
      'Level III naturalist guides',
      'Full board with 5-star meals',
      'Snorkeling & hiking equipment',
      'Airport assistance'
    ]
  }
];

// Daily tours data
const dailyTours = [
  {
    title: 'Half-Day Cloud Forest Trek',
    duration: '4 hours',
    price: '$85',
    includes: ['Expert guide', 'Binoculars', 'Light snack']
  },
  {
    title: 'Quito Colonial Walking Tour',
    duration: '3 hours',
    price: '$65',
    includes: ['Professional guide', 'UNESCO sites visit', 'Coffee tasting']
  },
  {
    title: 'Otavalo Market & Indigenous Villages',
    duration: '6 hours',
    price: '$110',
    includes: ['Guide', 'Market access', 'Lunch']
  },
  {
    title: 'Cotopaxi Volcano & Lake Limpioaga',
    duration: '8 hours',
    price: '$145',
    includes: ['Professional guide', 'Lunch', 'Equipment']
  }
];

function createPDF() {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 15;

  // Color scheme
  const primaryColor = [220, 90, 50]; // Vermilion
  const darkColor = [40, 50, 70]; // Dark blue
  const lightColor = [245, 245, 245]; // Light gray

  // Helper functions
  const addHeading = (text, size = 24, color = primaryColor) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.setFont('helvetica', 'bold');
    doc.text(text, 15, yPosition);
    yPosition += 8;
  };

  const addSubheading = (text, size = 14, color = darkColor) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.setFont('helvetica', 'bold');
    doc.text(text, 15, yPosition);
    yPosition += 6;
  };

  const addBody = (text, size = 10, color = [50, 50, 50]) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - 30);
    doc.text(lines, 15, yPosition);
    yPosition += lines.length * 4 + 2;
  };

  const addLine = () => {
    doc.setDrawColor(...primaryColor);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 3;
  };

  const addSpacing = (height = 5) => {
    yPosition += height;
  };

  const newPage = () => {
    doc.addPage();
    yPosition = 15;
  };

  // PAGE 1: COVER & INTRO
  addHeading('VERMILION ROUTES', 28);
  addSubheading('Premium Ecuador & Galápagos Expeditions', 16);
  addLine();
  addSpacing(5);

  addBody(
    'Discover the magic of Ecuador and Galápagos with expert-led expeditions, curated accommodations, and unforgettable wildlife encounters. From pristine cloud forests to isolated island sanctuaries, we craft journeys that transform travelers into advocates.',
    11
  );

  addSpacing(10);
  addSubheading('✓ Award-Winning Service', 12);
  addBody('Level III certified naturalist guides | Private transfers | All-inclusive itineraries', 10);

  addSpacing(3);
  addSubheading('✓ Transparent Pricing', 12);
  addBody('From $85 USD (full-day) to $2,290 USD (multi-day) | No hidden fees', 10);

  addSpacing(3);
  addSubheading('✓ Sustainable Tourism', 12);
  addBody('Wildlife-first approach | Local community partnerships | Conservation commitment', 10);

  addSpacing(15);
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('📍 Contact us: info@vermilionroutes.com | WhatsApp: +593 99 404 8458', 15, pageHeight - 20);

  // PAGE 2: MULTI-DAY TOURS
  newPage();
  addHeading('MULTI-DAY EXPEDITIONS', 24);
  addLine();
  addSpacing(5);

  tours.forEach((tour, idx) => {
    if (yPosition > pageHeight - 50) {
      newPage();
      addHeading('MULTI-DAY EXPEDITIONS (continued)', 18);
      addLine();
      addSpacing(3);
    }

    // Tour title & basics
    addSubheading(tour.title, 13);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`${tour.destination} • ${tour.duration}`, 15, yPosition);
    yPosition += 4;

    // Pricing
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(`From ${tour.price} USD (3-star) • ${tour.price4Star} USD (4-star)`, 15, yPosition);
    yPosition += 5;

    // Highlights
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    tour.highlights.forEach(h => {
      doc.text(`  • ${h}`, 17, yPosition);
      yPosition += 4;
    });

    addSpacing(3);
  });

  // PAGE 3: FULL-DAY TOURS
  newPage();
  addHeading('FULL-DAY ADVENTURES', 24);
  addLine();
  addSpacing(5);

  addBody(
    'Short on time? Our full-day excursions offer immersive experiences in Ecuador\'s most iconic destinations. All trips include professional guides, meals, and equipment.',
    10
  );

  addSpacing(8);

  dailyTours.forEach(tour => {
    if (yPosition > pageHeight - 30) {
      newPage();
      addHeading('FULL-DAY ADVENTURES (continued)', 18);
      addLine();
      addSpacing(3);
    }

    addSubheading(tour.title, 11);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Duration: ${tour.duration} | Price: ${tour.price}`, 15, yPosition);
    yPosition += 4;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    tour.includes.forEach(inc => {
      doc.text(`  ✓ ${inc}`, 17, yPosition);
      yPosition += 3;
    });

    addSpacing(4);
  });

  // PAGE 4: WHAT'S INCLUDED
  newPage();
  addHeading('WHAT\'S INCLUDED', 24);
  addLine();
  addSpacing(5);

  const inclusions = [
    {
      category: 'Transportation',
      items: [
        'Private airport transfers (arrival & departure)',
        'Domestic flights (where applicable)',
        'All ground transportation',
        'Speedboat excursions'
      ]
    },
    {
      category: 'Accommodation',
      items: [
        '3-star or 4-star hotel (your choice)',
        'Premium bed linens & amenities',
        'Safety lockers',
        'Daily housekeeping'
      ]
    },
    {
      category: 'Meals & Beverages',
      items: [
        'Buffet or continental breakfast',
        'Set-menu lunches',
        'Dinners (your choice of local restaurants)',
        'Snacks & fresh water on excursions'
      ]
    },
    {
      category: 'Expert Guidance',
      items: [
        'Level III certified naturalist guides',
        'Spanish & English interpretation',
        'Wildlife & ecology education',
        '24-hour support hotline'
      ]
    },
    {
      category: 'Equipment & Access',
      items: [
        'Snorkeling gear (mask, snorkel, fins)',
        'Hiking poles & binoculars',
        'Galapagos National Park entrance',
        'All guided activities'
      ]
    }
  ];

  inclusions.forEach(inc => {
    if (yPosition > pageHeight - 40) {
      newPage();
      addHeading('WHAT\'S INCLUDED (continued)', 18);
      addLine();
      addSpacing(3);
    }

    addSubheading(inc.category, 11);
    inc.items.forEach(item => {
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      doc.text(`  ✓ ${item}`, 17, yPosition);
      yPosition += 3;
    });
    addSpacing(3);
  });

  // PAGE 5: BOOKING INFO
  newPage();
  addHeading('HOW TO BOOK', 24);
  addLine();
  addSpacing(5);

  const steps = [
    {
      num: '1',
      title: 'Choose Your Adventure',
      desc: 'Select from our multi-day expeditions or full-day tours. Each experience is tailored to your interests and timeline.'
    },
    {
      num: '2',
      title: 'Confirm Dates & Accommodation',
      desc: 'Select your travel dates and choose between 3-star or 4-star accommodation. We\'ll check availability and hold your spot.'
    },
    {
      num: '3',
      title: 'Secure Payment',
      desc: 'Pay a 30% deposit to secure your booking. Full payment due 30 days before departure. We accept credit cards, PayPal, and bank transfers.'
    },
    {
      num: '4',
      title: 'Receive Itinerary Details',
      desc: 'Get a detailed packing list, guide bios, and pre-trip briefing. We\'ll confirm all flights, transfers, and meal times.'
    },
    {
      num: '5',
      title: 'Embark on Your Journey',
      desc: 'Arrive refreshed. Our team will meet you with a smile and craft memories that last a lifetime.'
    }
  ];

  steps.forEach(step => {
    if (yPosition > pageHeight - 25) {
      newPage();
      addHeading('HOW TO BOOK (continued)', 18);
      addLine();
      addSpacing(3);
    }

    // Step number circle
    doc.setFillColor(...primaryColor);
    doc.circle(20, yPosition + 2, 3, 'F');
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(step.num, 20, yPosition + 3, { align: 'center' });

    // Step title
    doc.setFontSize(11);
    doc.setTextColor(...darkColor);
    doc.setFont('helvetica', 'bold');
    doc.text(step.title, 28, yPosition);
    yPosition += 4;

    // Step description
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(step.desc, pageWidth - 45);
    doc.text(lines, 28, yPosition);
    yPosition += lines.length * 3.5 + 4;
  });

  // PAGE 6: FAQS & CONTACT
  newPage();
  addHeading('FREQUENTLY ASKED QUESTIONS', 24);
  addLine();
  addSpacing(5);

  const faqs = [
    {
      q: 'What is the best time to visit?',
      a: 'Year-round! Galápagos has warm weather every month. June–August offers cooler, sunny days. December–May brings warmer waters and more species.'
    },
    {
      q: 'Do I need vaccinations?',
      a: 'Yellow fever vaccination is recommended for Amazon trips. Consult your doctor 6-8 weeks before travel.'
    },
    {
      q: 'What is your cancellation policy?',
      a: '60+ days: Full refund. 30–60 days: 50% refund. <30 days: Non-refundable. Travel insurance is strongly recommended.'
    },
    {
      q: 'Can you arrange flights?',
      a: 'Yes! We can book international flights from major hubs. Let us know your origin, and we\'ll quote you.'
    },
    {
      q: 'Is travel insurance included?',
      a: 'No, but we highly recommend it. We can suggest reputable providers that cover adventure activities.'
    },
    {
      q: 'How fit do I need to be?',
      a: 'Our tours cater to all fitness levels. We offer optional hiking & water activities. Tell us your preferences; we\'ll customize.'
    }
  ];

  faqs.forEach(faq => {
    if (yPosition > pageHeight - 20) {
      newPage();
      addHeading('FREQUENTLY ASKED QUESTIONS (continued)', 18);
      addLine();
      addSpacing(3);
    }

    addSubheading(faq.q, 10);
    addBody(faq.a, 9);
    addSpacing(2);
  });

  addSpacing(10);
  addLine();
  addSpacing(5);

  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTACT VERMILION ROUTES', 15, yPosition);
  yPosition += 6;

  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  const contact = [
    '📧 Email: info@vermilionroutes.com',
    '📱 WhatsApp: +593 99 404 8458',
    '☎️ Reservations: +593 98 399 2549',
    '🌐 Website: www.vermilionroutes.com',
    '📍 Office: Quito, Ecuador'
  ];

  contact.forEach(line => {
    doc.text(line, 15, yPosition);
    yPosition += 5;
  });

  // Save PDF
  const outputPath = path.join(__dirname, '../public/Vermilion_Routes_Tours_Catalog.pdf');
  doc.save(outputPath);
  console.log(`✓ PDF generated successfully: ${outputPath}`);
}

createPDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
