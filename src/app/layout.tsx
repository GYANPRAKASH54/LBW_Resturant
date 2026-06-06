import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lounge Before Wicket | Premium Dining & Sports Lounge, Urja Stadium Patna",
  description: "Experience Patna's most premium sports lounge and family restaurant at Urja Stadium, Rajbansi Nagar. Live sports screening, luxury tandoor, Pan-Asian and continental dining. Book your table now!",
  keywords: [
    "Lounge Before Wicket",
    "LBW Patna",
    "Best restaurant in Patna",
    "Lounge in Patna",
    "Family restaurant Patna",
    "Sports bar Patna",
    "Urja Stadium restaurant",
    "Rajbansi Nagar dining",
    "Patna luxury lounge",
    "Best tandoori chicken in Patna"
  ],
  authors: [{ name: "Lounge Before Wicket" }],
  openGraph: {
    title: "Lounge Before Wicket | Premium Sports Lounge & Restaurant in Patna",
    description: "Enjoy luxurious dining, live sports screenings, and exquisite multi-cuisine at Urja Stadium, Patna. 4.0 Stars with 3285+ reviews.",
    type: "website",
    locale: "en_IN",
    url: "https://loungebeforewicket.com",
    siteName: "Lounge Before Wicket"
  },
  alternates: {
    canonical: "https://loungebeforewicket.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Lounge Before Wicket",
    "image": "https://loungebeforewicket.com/images/lounge_ambient.jpg",
    "@id": "https://loungebeforewicket.com",
    "url": "https://loungebeforewicket.com",
    "telephone": "+919117269999",
    "priceRange": "$$",
    "menu": "https://loungebeforewicket.com#menu",
    "servesCuisine": "Indian, Pan-Asian, Continental, Italian",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Urja Stadium, Near DAV School, Rajbansi Nagar",
      "addressLocality": "Patna",
      "addressRegion": "Bihar",
      "postalCode": "801103",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.61005,
      "longitude": 85.1038
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.0",
      "reviewCount": "3285"
    }
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-[#C5A880] selection:text-[#070707]">
        {children}
      </body>
    </html>
  );
}
