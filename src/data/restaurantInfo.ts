export interface OperatingHours {
  day: string;
  lunch: string;
  dinner: string;
  full: string;
}

export const RESTAURANT_INFO = {
  name: "Korea House Korean Cuisine & Sushi",
  shortName: "Korea House",
  tagline: "Authentic Korean Cuisine. Fresh Sushi. Unforgettable Flavor.",
  establishedYear: 1979,
  address: {
    street: "2598 Royal Lane",
    city: "Dallas",
    state: "TX",
    zip: "75229",
    full: "2598 Royal Lane, Dallas, TX 75229",
    neighborhood: "Dallas Koreatown / Asian Trade District"
  },
  phone: "(972) 243-0434",
  phoneRaw: "+19722430434",
  officialWebsite: "https://koreahousedallas.com/",
  /** Google Business profile — order online / place actions */
  onlineOrderUrl:
    "https://www.google.com/search?sca_esv=7c3ebe48f4e687d0&cs=1&output=search&kgmid=/g/1vc826dh&q=Korea+House+Korean+Cuisine+%26+Sushi&shem=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/uni/m1/1&kgs=9d1074bba988fc3f&utm_source=dlvs1,epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/uni/m1/1",
  googleSearchUrl:
    "https://www.google.com/search?q=Korea+House+Korean+Cuisine+%26+Sushi&kgmid=/g/1vc826dh",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=2598+Royal+Lane+Dallas+TX+75229",
  /** Google reviews / leave-a-review via Business Profile. */
  googleReviewUrl:
    "https://www.google.com/search?q=Korea+House+Korean+Cuisine+%26+Sushi&kgmid=/g/1vc826dh",
  hours: [
    { day: "Monday", lunch: "11:00 AM – 3:00 PM", dinner: "3:00 PM – 10:00 PM", full: "11:00 AM – 10:00 PM" },
    { day: "Tuesday", lunch: "11:00 AM – 3:00 PM", dinner: "3:00 PM – 10:00 PM", full: "11:00 AM – 10:00 PM" },
    { day: "Wednesday", lunch: "11:00 AM – 3:00 PM", dinner: "3:00 PM – 10:00 PM", full: "11:00 AM – 10:00 PM" },
    { day: "Thursday", lunch: "11:00 AM – 3:00 PM", dinner: "3:00 PM – 10:00 PM", full: "11:00 AM – 10:00 PM" },
    { day: "Friday", lunch: "11:00 AM – 3:00 PM", dinner: "3:00 PM – 10:00 PM", full: "11:00 AM – 10:00 PM" },
    { day: "Saturday", lunch: "11:00 AM – 3:00 PM", dinner: "3:00 PM – 10:00 PM", full: "11:00 AM – 10:00 PM" },
    { day: "Sunday", lunch: "11:00 AM – 3:00 PM", dinner: "3:00 PM – 10:00 PM", full: "11:00 AM – 10:00 PM" }
  ],
  services: [
    "Dine-in with authentic table service",
    "Korean Barbecue and sizzling platters",
    "Full-service artisan sushi and sashimi bar",
    "Generous lunch bento boxes and specials",
    "Takeout and online ordering for pickup",
    "Comfortable seating for families and private groups"
  ]
};
