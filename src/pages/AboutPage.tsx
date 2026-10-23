import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Phone, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { IMAGES } from '../data/images';
import { CallToAction } from '../components/CallToAction';

interface AboutPageProps {
  onOpenOrderModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenOrderModal }) => {
  return (
    <div className="flex flex-col">
      {/* 1. Page Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.restaurantInteriorDining}
            alt="Interior dining atmosphere at Korea House Dallas"
            className="hero-photo"
          />
          <div className="hero-overlay" />
          <div className="hero-overlay-soft" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          <div className="hero-badge mb-3">
            <span>Our Heritage &amp; Tradition</span>
          </div>
          <h1 className="hero-title font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Welcoming Dallas Since 1979
          </h1>
          <p className="hero-lead mt-4 text-lg sm:text-xl max-w-2xl">
            For more than four decades, Korea House Korean Cuisine &amp; Sushi has been a landmark destination on Royal Lane for authentic Korean comfort food and artisan Japanese sushi.
          </p>
        </div>
      </section>

      {/* 2. Main Narrative: The Story & Culinary Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
              The Korea House Story
            </span>
            <h2 className="page-heading text-3xl sm:text-4xl tracking-tight leading-snug">
              A Dallas Koreatown Cornerstone
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              When Korea House first opened its doors in 1979, the Dallas Koreatown community along Royal Lane was just beginning to take shape. Through decades of growth and culinary evolution, Korea House has remained a steady favorite for authentic homestyle Korean cooking.
            </p>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Our philosophy has always focused on generous, unpretentious hospitality: preparing traditional marinades from scratch with real fruits and garlic, simmering bone broths for hours, and presenting every table with a colorful spread of complimentary banchan side dishes.
            </p>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              To complement our robust Korean grilled meats and spicy stews, our dedicated sushi bar offers fresh nigiri, pristine sashimi, and specialty rolls rolled to order by seasoned sushi chefs.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#FB923C] text-white text-xs font-semibold rounded-md transition-colors"
              >
                <span>Explore the Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#EFF6FF] border border-[#CBD5E1] text-[#1E40AF] text-xs font-medium rounded-md transition-colors"
              >
                <span>Find Us on Royal Lane</span>
              </Link>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#282f40]">
            <img
              src={IMAGES.heroKoreanBbqSushi}
              alt="Artisan Korean feast and sushi banquet at Korea House"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-xs text-[#d8dfed]">
              <span className="text-[#2563EB] font-semibold block text-sm">Two Culinary Traditions Under One Roof</span>
              <span>Generous Korean banchan, sizzling LA Galbi, and artisan sushi rolls.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Pillars of the Dining Experience */}
      <section className="py-20 bg-[#EFF6FF] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
              Our Core Commitments
            </span>
            <h2 className="page-heading text-3xl sm:text-4xl mt-2">
              What Defines Korea House
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] border border-[#CBD5E1] p-8 rounded-xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center text-[#FB923C]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Authentic Flavors</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                We never cut corners on traditional recipes. From 8-hour beef bone broths to house-aged kimchi and signature Galbi marinades, the taste is deep and uncompromising.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#CBD5E1] p-8 rounded-xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1E40AF]/30 border border-[#3B82F6]/40 flex items-center justify-center text-[#2563EB]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Fresh Sushi Daily</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Our sushi chefs hand-select fresh Atlantic salmon, bigeye tuna, and yellowtail to provide a comprehensive Japanese sushi bar alongside traditional Korean dining.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#CBD5E1] p-8 rounded-xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#3d2f16]/40 border border-[#2563EB]/40 flex items-center justify-center text-[#2563EB]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Welcoming Atmosphere</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Whether you are joining us for a quick weekday lunch bento or celebrating a special occasion with a full banquet, our team makes you feel right at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verified Restaurant Details Quick Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white border border-[#CBD5E1] rounded-xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
              Location &amp; Visit Details
            </span>
            <h2 className="page-heading text-2xl sm:text-3xl mt-2">
              Ready to Experience Korea House?
            </h2>
            <p className="text-sm text-[#64748B] mt-3 leading-relaxed">
              We look forward to serving you. Visit us at 2598 Royal Lane in Dallas, open daily from 11:00 AM to 10:00 PM for dine-in, lunch specials, and takeout.
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#475569]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563EB]" />
                <span>2598 Royal Ln, Dallas, TX 75229</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2563EB]" />
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="hover:text-[#2563EB] transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>Daily 11:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <CallToAction onOpenOrderModal={onOpenOrderModal} />
    </div>
  );
};
