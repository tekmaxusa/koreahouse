import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Utensils, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface CallToActionProps {
  onOpenOrderModal?: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenOrderModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#DBEAFE] to-[#FFFFFF] border-t border-[#BFDBFE] py-20 px-4 sm:px-6 lg:px-8 text-center">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F97316]/10 blur-[100px] pointer-events-none rounded-full"
      />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold mb-3">
          Join Us in Dallas Koreatown
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] tracking-tight leading-tight">
          Your Next Favorite Meal Awaits.
        </h2>
        <p className="mt-4 text-base text-[#64748B] max-w-xl leading-relaxed">
          Whether you crave the sizzling tenderness of prime Korean Galbi or fresh hand-crafted sushi rolls, Korea House welcomes you to experience over 40 years of culinary tradition.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full max-w-lg sm:max-w-none">
          <a
            href={RESTAURANT_INFO.onlineOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F97316] hover:bg-[#FB923C] active:bg-[#EA580C] text-white font-semibold rounded-md shadow-lg shadow-blue-900/10 transition-all text-sm whitespace-nowrap w-full sm:w-auto"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Order Online</span>
          </a>

          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-medium rounded-md transition-all text-sm whitespace-nowrap w-full sm:w-auto"
          >
            <Utensils className="w-4 h-4 text-[#2563EB]" />
            <span>Explore the Menu</span>
          </Link>

          {onOpenOrderModal ? (
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-medium rounded-md transition-all text-sm whitespace-nowrap w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-[#2563EB]" />
              <span>Call for Takeout</span>
            </button>
          ) : (
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-medium rounded-md transition-all text-sm whitespace-nowrap w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-[#2563EB]" />
              <span>Call (972) 243-0434</span>
            </a>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#64748B]">
          <span>2598 Royal Ln, Dallas, TX 75229</span>
          <span aria-hidden="true">·</span>
          <span>Open Daily 11:00 AM – 10:00 PM</span>
        </div>
      </div>
    </section>
  );
};
