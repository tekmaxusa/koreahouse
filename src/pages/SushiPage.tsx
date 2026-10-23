import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, ArrowRight, Phone, CheckCircle, Utensils } from 'lucide-react';
import {
  MENU_ITEMS,
  MenuItem,
  SUSHI_ROLL_CATEGORIES,
  SUSHI_NIGIRI_CATEGORIES,
  GRILLED_FISH_CATEGORY,
} from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { IMAGES } from '../data/images';
import { FoodCard } from '../components/FoodCard';
import { CallToAction } from '../components/CallToAction';

interface SushiPageProps {
  onOpenOrderModal: (dishName?: string) => void;
}

export const SushiPage: React.FC<SushiPageProps> = ({ onOpenOrderModal }) => {
  const allSushiItems = MENU_ITEMS.filter((i) =>
    (SUSHI_ROLL_CATEGORIES as readonly string[]).includes(i.category)
  );
  const sushiRolls = allSushiItems.filter((i) => /roll/i.test(i.name));
  const nigiriSashimi = allSushiItems.filter((i) => !/roll/i.test(i.name));
  const japaneseSpecialties = MENU_ITEMS.filter(
    (i) => i.category === GRILLED_FISH_CATEGORY || i.name.toLowerCase().includes('teriyaki')
  );

  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.sushiSpecialRollsSashimi}
            alt="Artisan sushi platter with fresh nigiri, sashimi, and specialty rolls at Korea House Dallas"
            className="hero-photo"
          />
          <div className="hero-overlay" />
          <div className="hero-overlay-soft" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          <div className="hero-badge mb-4">
            <Fish className="w-4 h-4 text-[#2563EB]" />
            <span>Dedicated Sushi Bar</span>
          </div>

          <h1 className="hero-title font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Artisan Sushi &amp; Japanese Cuisine
          </h1>

          <p className="hero-lead mt-4 text-lg sm:text-xl max-w-2xl">
            Fresh sashimi cuts, hand-pressed nigiri, inventive specialty rolls, and Japanese bento boxes crafted fresh to order by our experienced sushi chefs.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/menu"
              className="px-6 py-3 bg-[#F97316] hover:bg-[#FB923C] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2"
            >
              <span>Explore Sushi Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={RESTAURANT_INFO.onlineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#FFFFFF]/90 hover:bg-[#F1F5F9] border border-[#94A3B8] text-[#0F172A] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Order Online</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Sushi Craftsmanship Intro */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#F1F5F9] border border-[#E2E8F0] p-8 rounded-xl flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1E40AF]/40 border border-[#3B82F6]/50 flex items-center justify-center text-[#2563EB] mb-1">
              <Fish className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">Daily Fresh Sourcing</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              We select sashimi-grade Atlantic salmon, yellowtail (hamachi), and bigeye tuna to ensure clean, buttery texture in every bite.
            </p>
          </div>

          <div className="bg-[#F1F5F9] border border-[#E2E8F0] p-8 rounded-xl flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3d2f16]/40 border border-[#2563EB]/50 flex items-center justify-center text-[#2563EB] mb-1">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">Hand-Pressed Nigiri</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Seasoned sushi rice formed at body temperature with a light dab of real wasabi, draped in precisely sliced raw fish.
            </p>
          </div>

          <div className="bg-[#F1F5F9] border border-[#E2E8F0] p-8 rounded-xl flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center text-[#FB923C] mb-1">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">The Best of Both Worlds</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Pair your sizzling Korean Galbi and bibimbap with fresh sushi rolls or our signature Bulgogi &amp; Sushi bento combo.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Specialty Sushi Rolls Section */}
      <section className="py-16 bg-[#EFF6FF] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
                House Creations &amp; Classics
              </span>
              <h2 className="page-heading text-3xl mt-1">
                Specialty Sushi Rolls
              </h2>
              <p className="text-sm text-[#64748B] mt-1 max-w-xl">
                Fresh ingredients, crisp tempura, unagi glazes, and tobiko pearls crafted fresh at the bar.
              </p>
            </div>

            <Link
              to="/menu"
              className="text-xs font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
            >
              See full roll list &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sushiRolls.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onSelect={(selected: MenuItem) => onOpenOrderModal(selected.uberEatsName ?? selected.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nigiri & Sashimi Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
              Pure, Pristine Cuts
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Nigiri &amp; Sashimi Combos
            </h2>
            <p className="text-sm text-[#64748B] mt-1 max-w-xl">
              Served with fresh wasabi, pickled ginger, and hot miso soup.
            </p>
          </div>

          <Link
            to="/menu"
            className="text-xs font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
          >
            See all sashimi &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nigiriSashimi.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onSelect={(selected: MenuItem) => onOpenOrderModal(selected.uberEatsName ?? selected.name)}
            />
          ))}
        </div>
      </section>

      {/* 5. Japanese Specialties & Bento Boxes */}
      <section className="py-16 bg-[#EFF6FF] border-t border-[#BFDBFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold">
                Bentos &amp; Broiled Fish
              </span>
              <h2 className="page-heading text-3xl mt-1">
                Japanese Kitchen Specialties
              </h2>
              <p className="text-sm text-[#64748B] mt-1 max-w-xl">
                Crispy tempura, broiled whole Atlantic mackerel, and generous bento box combinations.
              </p>
            </div>

            <Link
              to="/menu"
              className="text-xs font-semibold text-[#2563EB] hover:underline whitespace-nowrap"
            >
              View full menu &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {japaneseSpecialties.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onSelect={(selected: MenuItem) => onOpenOrderModal(selected.uberEatsName ?? selected.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <CallToAction onOpenOrderModal={() => onOpenOrderModal()} />
    </div>
  );
};
