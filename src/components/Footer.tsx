import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E3A8A] border-t border-[#3B82F6] text-blue-100 pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-blue-400/30">
          {/* Col 1: Brand & Legacy */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                KOREA HOUSE
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-[#FDBA74] font-semibold mt-1">
                Korean Cuisine &amp; Sushi
              </p>
            </div>
            <p className="text-sm leading-relaxed text-blue-100/90">
              Serving authentic Korean BBQ, traditional stews, and fresh artisan sushi in Dallas since 1979. A cornerstone of Dallas Koreatown on Royal Lane for more than four decades.
            </p>
            <div className="text-xs text-[#FDBA74] font-medium pt-1">
              Established 1979 · Dallas, Texas
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#FDBA74] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FDBA74] transition-colors">
                  Full Restaurant Menu
                </Link>
              </li>
              <li>
                <Link to="/korean-cuisine" className="hover:text-[#FDBA74] transition-colors">
                  Korean Cuisine &amp; BBQ
                </Link>
              </li>
              <li>
                <Link to="/sushi" className="hover:text-[#FDBA74] transition-colors">
                  Sushi &amp; Japanese Dishes
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#FDBA74] transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FDBA74] transition-colors">
                  About Our Restaurant
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FDBA74] transition-colors">
                  Location &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours of Operation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FDBA74]" />
              <span>Hours of Operation</span>
            </h4>
            <div className="text-xs flex flex-col gap-1.5 text-blue-100/90">
              <div className="flex justify-between py-1 border-b border-blue-400/30">
                <span className="font-medium text-white">Monday – Sunday</span>
                <span className="tabular-nums">11:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-400/30">
                <span>Lunch Specials</span>
                <span className="tabular-nums">11:00 AM – 3:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-400/30">
                <span>Dinner Service</span>
                <span className="tabular-nums">3:00 PM – 10:00 PM</span>
              </div>
              <p className="text-[11px] text-blue-200/80 mt-1 italic">
                *Kitchen closes 30 minutes prior to closing for orders.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Directions */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FDBA74]" />
              <span>Find Us</span>
            </h4>
            <p className="text-sm text-blue-100/90">
              {RESTAURANT_INFO.address.street}
              <br />
              {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.zip}
            </p>
            <div className="flex items-center gap-2 text-sm text-white">
              <Phone className="w-4 h-4 text-[#FDBA74]" />
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="hover:text-[#FDBA74] transition-colors tabular-nums font-medium"
              >
                {RESTAURANT_INFO.phone}
              </a>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FDBA74] hover:text-white transition-colors"
              >
                <span>Get Directions (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={RESTAURANT_INFO.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-200/80 hover:text-white transition-colors"
              >
                <span>Official Site: koreahousedallas.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>2598 Royal Ln, Dallas, TX 75229</span>
            <span aria-hidden="true">·</span>
            <span>Authentic Korean Cuisine &amp; Japanese Sushi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
