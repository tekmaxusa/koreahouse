import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Flame,
  Fish,
  Utensils,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { IMAGES } from '../data/images';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { FoodCard } from '../components/FoodCard';
import { CallToAction } from '../components/CallToAction';

interface HomePageProps {
  onOpenOrderModal: (dishName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenOrderModal }) => {
  // Select top signature dishes
  const signatureDishes = MENU_ITEMS.filter((item) => item.isSignature).slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image with calibrated contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroKoreanBbqSushi}
            alt="Authentic Korean BBQ feast and fresh sushi spread at Korea House Dallas"
            className="hero-photo"
          />
          <div className="hero-overlay" />
          <div className="hero-overlay-soft" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          <div className="hero-badge mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F97316]" />
            <span>Dallas Koreatown Landmark · Est. 1979</span>
          </div>

          <h1 className="hero-title font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.15]">
            Authentic Korean Cuisine. Fresh Sushi. Unforgettable Flavor.
          </h1>

          <p className="hero-lead mt-6 text-lg sm:text-xl md:text-2xl max-w-2xl font-normal">
            Discover the rich flavors of Korea and the art of Japanese sushi at Korea House Korean Cuisine &amp; Sushi.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={RESTAURANT_INFO.onlineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#F97316] hover:bg-[#FB923C] active:bg-[#EA580C] text-white font-semibold rounded-md shadow-xl shadow-orange-500/25 transition-all text-base tracking-wide whitespace-nowrap flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>Order Online</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              to="/menu"
              className="px-7 py-3.5 bg-[#FFFFFF]/95 hover:bg-[#F1F5F9] border border-[#94A3B8] text-[#0F172A] font-medium rounded-md backdrop-blur-sm transition-all text-base tracking-wide whitespace-nowrap flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={RESTAURANT_INFO.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#FFFFFF]/90 hover:bg-[#F1F5F9] border border-[#94A3B8] text-[#0F172A] font-medium rounded-md backdrop-blur-sm transition-all text-sm tracking-wide whitespace-nowrap flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#2563EB]" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Restaurant Quick Information Area */}
          <div className="mt-12 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-left">
            <div className="flex items-center gap-3 bg-[#FFFFFF]/80 backdrop-blur-md p-3.5 rounded-lg border border-[#CBD5E1]">
              <MapPin className="w-5 h-5 text-[#2563EB] shrink-0" />
              <div className="text-sm">
                <span className="text-[#64748B] block text-xs font-medium uppercase tracking-wide">Location</span>
                <span className="text-[#0F172A] font-medium">2598 Royal Ln, Dallas TX</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#FFFFFF]/80 backdrop-blur-md p-3.5 rounded-lg border border-[#CBD5E1]">
              <Phone className="w-5 h-5 text-[#2563EB] shrink-0" />
              <div className="text-sm">
                <span className="text-[#64748B] block text-xs font-medium uppercase tracking-wide">Phone Orders</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-[#0F172A] font-medium hover:text-[#2563EB] transition-colors"
                >
                  (972) 243-0434
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#FFFFFF]/80 backdrop-blur-md p-3.5 rounded-lg border border-[#CBD5E1]">
              <Clock className="w-5 h-5 text-[#2563EB] shrink-0" />
              <div className="text-sm">
                <span className="text-[#64748B] block text-xs font-medium uppercase tracking-wide">Operating Hours</span>
                <span className="text-[#0F172A] font-medium">Daily 11:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature Food Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
              Authentic Korean &amp; Sushi Specialties
            </span>
            <h2 className="page-heading text-3xl sm:text-4xl mt-1">
              Signature Dishes &amp; Customer Favorites
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#60A5FA] transition-colors whitespace-nowrap"
          >
            <span>Browse All Menu Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {signatureDishes.map((dish) => (
            <FoodCard
              key={dish.id}
              item={dish}
              onSelect={(item: MenuItem) => onOpenOrderModal(item.uberEatsName ?? item.name)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-medium rounded-md transition-all text-sm"
          >
            <span>View Full Menu with Verified Pricing</span>
            <ChevronRight className="w-4 h-4 text-[#2563EB]" />
          </Link>
        </div>
      </section>

      {/* 3. Why Choose Korea House? */}
      <section className="py-20 bg-[#EFF6FF] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
              The Korea House Experience
            </span>
            <h2 className="page-heading text-3xl sm:text-4xl mt-2">
              Why Diners Have Chosen Us Since 1979
            </h2>
            <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
              For over forty years on Royal Lane, we have combined time-honored Korean culinary heritage with the precision of Japanese sushi craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] p-8 rounded-lg flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center text-[#FB923C]">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                Korean BBQ &amp; Heritage Stews
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                From our celebrated LA Galbi short ribs and caramelized Bulgogi to bubbling earthenware pots of spicy Soondubu Jjigae, every recipe honors traditional Korean flavor depth.
              </p>
              <Link
                to="/korean-cuisine"
                className="mt-auto pt-2 text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>Explore Korean Cuisine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E8F0] p-8 rounded-lg flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1E40AF]/30 border border-[#3B82F6]/40 flex items-center justify-center text-[#2563EB]">
                <Fish className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                Artisan Sushi &amp; Fresh Fish
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Enjoy delicate nigiri, pristine sashimi cuts of Atlantic salmon and bigeye tuna, along with house-crafted specialty rolls rolled fresh at our dedicated sushi counter.
              </p>
              <Link
                to="/sushi"
                className="mt-auto pt-2 text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>Explore Sushi Selections</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E8F0] p-8 rounded-lg flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#3d2f16]/40 border border-[#2563EB]/40 flex items-center justify-center text-[#2563EB]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                Authentic Korean Hospitality
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Every table is greeted with an assortment of fresh banchan (side dishes), warm attentive service, and an atmosphere suitable for family feasts, business lunches, and private groups.
              </p>
              <Link
                to="/about"
                className="mt-auto pt-2 text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>Read Our Story</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Restaurant Introduction & Atmosphere Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#282f40]">
            <img
              src={IMAGES.restaurantInteriorDining}
              alt="Warm, spacious dining room interior of Korea House Dallas on Royal Lane"
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-xs text-[#d8dfed]">
              <span className="text-[#2563EB] font-semibold block text-sm">Korea House Dining Room</span>
              <span>Spacious booths, authentic warm wood accents, and dedicated sushi bar.</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
              Dallas Koreatown Landmark
            </span>
            <h2 className="page-heading text-3xl sm:text-4xl tracking-tight leading-snug">
              A True Gathering Place for Lovers of Korean Cuisine and Sushi
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Located on Royal Lane in the heart of Dallas&apos;s Asian Trade District, Korea House has stood as a welcoming home for delicious meals and celebratory dinners since 1979.
            </p>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Our kitchen bridges two beloved Asian culinary worlds: the sizzle and deep fermented richness of authentic Korean cooking, paired seamlessly with clean, artisan Japanese sushi and sashimi.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#FB923C] text-white font-semibold rounded-md text-sm transition-colors"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#CBD5E1] text-[#1E40AF] font-medium rounded-md text-sm transition-colors"
              >
                <span>View Photo Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visit Us / Quick Location & Hours */}
      <section className="py-16 bg-[#EFF6FF] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl p-8 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">
                Visit Korea House
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F172A]">
                2598 Royal Lane, Dallas
              </h3>
              <p className="text-sm text-[#64748B]">
                Conveniently located off Royal Lane in Dallas, TX 75229. Ample parking available for dining guests.
              </p>
              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 py-4 md:py-0 md:px-6 md:border-x border-[#E2E8F0]">
              <span className="text-xs uppercase tracking-wider text-[#1E293B] font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>Operating Hours</span>
              </span>
              <div className="text-xs text-[#64748B] space-y-1.5">
                <div className="flex justify-between font-medium text-[#0F172A]">
                  <span>Every Day:</span>
                  <span className="tabular-nums">11:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Lunch Bento Specials:</span>
                  <span className="tabular-nums">11:00 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Dinner Service:</span>
                  <span className="tabular-nums">3:00 PM – 10:00 PM</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wider text-[#1E293B] font-semibold flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#2563EB]" />
                <span>Call or Inquire</span>
              </span>
              <p className="text-xs text-[#64748B]">
                Call ahead for takeout orders or large table reservations.
              </p>
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#F97316] hover:bg-[#FB923C] text-white font-semibold rounded-md text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call (972) 243-0434</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <CallToAction onOpenOrderModal={() => onOpenOrderModal()} />
    </div>
  );
};
