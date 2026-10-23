import React, { useState, useMemo } from 'react';
import { Search, Phone, Filter, X, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { FoodCard } from '../components/FoodCard';
import { CallToAction } from '../components/CallToAction';
import { menuCategoryLabel } from '../utils/menuCategoryLabel';

interface MenuPageProps {
  onOpenOrderModal: (dishName?: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onOpenOrderModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spicyOnly, setSpicyOnly] = useState<boolean>(false);
  const [signatureOnly, setSignatureOnly] = useState<boolean>(false);

  // Filter menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      // Spicy filter
      if (spicyOnly && (!item.spicyLevel || item.spicyLevel === 0)) {
        return false;
      }
      // Signature filter
      if (signatureOnly && !item.isSignature) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchHangul = item.koreanName ? item.koreanName.includes(query) : false;
        const matchTag = item.tags ? item.tags.some(t => t.toLowerCase().includes(query)) : false;
        if (!matchName && !matchDesc && !matchHangul && !matchTag) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery, spicyOnly, signatureOnly]);

  return (
    <div className="flex flex-col min-h-screen min-w-0 w-full">
      {/* Page Header */}
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#2563EB] font-semibold mb-2">
              <span>Authentic Recipes</span>
              <span aria-hidden="true" className="text-[#CBD5E1] hidden sm:inline">·</span>
              <span className="hidden sm:inline">Prepared Fresh Daily</span>
            </div>
            <h1 className="page-heading text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Restaurant Menu
            </h1>
            <p className="page-subheading mt-3 max-w-2xl">
              Same categories, item names, prices, and photos as our Uber Eats menu. Order online for pickup or call for dine-in and takeout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="px-4 py-2.5 bg-[#EFF6FF] border border-[#CBD5E1] hover:bg-[#E2E8F0] text-[#0F172A] text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>(972) 243-0434</span>
            </a>
            <a
              href={RESTAURANT_INFO.onlineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#F97316] hover:bg-[#FB923C] text-white text-sm font-semibold rounded-md transition-colors text-center"
            >
              Order Online
            </a>
          </div>
        </div>
      </section>

      {/* Menu Controls: Search & Category Tabs */}
      <section
        className="sticky z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] py-4"
        style={{ top: 'var(--site-header-height, 4.5rem)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Galbi, Bibimbap, Sushi, Tuna)..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-base text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E40AF]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#64748B] hidden sm:inline flex items-center gap-1 font-medium">
                <Filter className="w-3 h-3 text-[#2563EB]" />
                <span>Filters:</span>
              </span>
              <button
                onClick={() => setSignatureOnly(!signatureOnly)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  signatureOnly
                    ? 'bg-[#2563EB] text-black font-semibold'
                    : 'bg-[#FFFFFF] border border-[#CBD5E1] text-[#64748B] hover:text-[#1E40AF]'
                }`}
              >
                House Specialties
              </button>
              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  spicyOnly
                    ? 'bg-[#F97316] text-white font-semibold'
                    : 'bg-[#FFFFFF] border border-[#CBD5E1] text-[#64748B] hover:text-[#1E40AF]'
                }`}
              >
                Spicy Dishes
              </button>
              {(searchQuery || activeCategory !== 'All' || spicyOnly || signatureOnly) && (
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                    setSpicyOnly(false);
                    setSignatureOnly(false);
                  }}
                  className="px-2.5 py-1.5 text-sm text-[#2563EB] hover:underline whitespace-nowrap ml-1"
                >
                  Reset all
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Tabs (Segmented functional buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory scrollbar-none text-sm max-w-full">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  title={cat}
                  className={`px-3.5 sm:px-4 py-2.5 rounded-md font-medium whitespace-nowrap shrink-0 snap-start transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-black font-semibold shadow-md'
                      : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#1E40AF] hover:bg-[#EFF6FF] border border-[#E2E8F0]'
                  }`}
                >
                  {menuCategoryLabel(cat)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Grid Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Active status indicator & results count */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-8 pb-3 border-b border-[#E2E8F0] text-sm text-[#64748B]">
          <div className="min-w-0">
            Showing <span className="font-semibold text-[#1E40AF] tabular-nums">{filteredItems.length}</span> items
            {activeCategory !== 'All' && (
              <span>
                {' '}
                in <strong className="text-[#2563EB]">{menuCategoryLabel(activeCategory, 'full')}</strong>
              </span>
            )}
            {searchQuery && <span> matching &ldquo;<span className="text-[#1E40AF] font-medium">{searchQuery}</span>&rdquo;</span>}
          </div>
          <div className="text-xs sm:text-sm text-[#64748B] italic sm:text-right sm:max-w-md shrink-0">
            *Synced with Uber Eats Korea House — prices and availability may change on delivery apps.
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8">
            <div className="p-4 bg-[#EFF6FF] rounded-full text-[#2563EB] mb-3">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">No menu items found</h3>
            <p className="text-sm text-[#64748B] mt-1 max-w-md">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setSpicyOnly(false);
                setSignatureOnly(false);
              }}
              className="mt-5 px-5 py-2.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] text-sm font-semibold rounded-md border border-[#94A3B8] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onSelect={(selected: MenuItem) =>
                  onOpenOrderModal(selected.uberEatsName ?? selected.name)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Korean Banchan Note */}
      <section className="bg-[#EFF6FF] border-t border-[#E2E8F0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center shrink-0">
            <span className="font-serif text-2xl font-bold text-[#FB923C]">반찬</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">
              Complimentary Banchan with Every Korean Entree
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
              At Korea House, every Korean BBQ and stew entree is served with our rotating assortment of house-made side dishes: freshly fermented napa cabbage kimchi, seasoned bean sprouts, braised sweet potatoes, pickled radish, and steamed rice.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <CallToAction onOpenOrderModal={() => onOpenOrderModal()} />
    </div>
  );
};
