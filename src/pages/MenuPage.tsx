import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Search, Phone, Filter, X, UtensilsCrossed, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const updateCategoryScrollState = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;

    updateCategoryScrollState();
    el.addEventListener('scroll', updateCategoryScrollState, { passive: true });
    window.addEventListener('resize', updateCategoryScrollState);

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateCategoryScrollState) : null;
    observer?.observe(el);

    return () => {
      el.removeEventListener('scroll', updateCategoryScrollState);
      window.removeEventListener('resize', updateCategoryScrollState);
      observer?.disconnect();
    };
  }, [updateCategoryScrollState]);

  const scrollCategories = (direction: 'left' | 'right') => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const amount = Math.max(220, Math.floor(el.clientWidth * 0.65));
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

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
      <section className="bg-[#12151c] border-b border-[#1d222e] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
              <span>Authentic Recipes</span>
              <span aria-hidden="true" className="text-[#3c4456] hidden sm:inline">·</span>
              <span className="hidden sm:inline">Prepared Fresh Daily</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Restaurant Menu
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#9aa2b2] max-w-2xl leading-relaxed">
              Same categories, item names, prices, and photos as our DoorDash menu. Order online for delivery or call for dine-in and pickup.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="px-4 py-2.5 bg-[#1a1f2b] border border-[#2c3344] hover:bg-[#232938] text-[#f2efe9] text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>(972) 243-0434</span>
            </a>
            <a
              href={RESTAURANT_INFO.onlineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#9e2a2b] hover:bg-[#b03032] text-white text-sm font-semibold rounded-md transition-colors text-center"
            >
              Order Online
            </a>
          </div>
        </div>
      </section>

      {/* Menu Controls: Search & Category Tabs */}
      <section
        className="sticky z-30 bg-[#0f1115]/95 backdrop-blur-md border-b border-[#1d222e] py-4"
        style={{ top: 'var(--site-header-height, 4.5rem)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#758092] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Galbi, Bibimbap, Sushi, Tuna)..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#161a24] border border-[#262c3b] rounded-lg text-base text-white placeholder-[#687285] focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#758092] hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#8a92a3] hidden sm:inline flex items-center gap-1 font-medium">
                <Filter className="w-3 h-3 text-[#d4af37]" />
                <span>Filters:</span>
              </span>
              <button
                onClick={() => setSignatureOnly(!signatureOnly)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  signatureOnly
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'bg-[#181d28] border border-[#2b3344] text-[#a2aab8] hover:text-white'
                }`}
              >
                House Specialties
              </button>
              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  spicyOnly
                    ? 'bg-[#9e2a2b] text-white font-semibold'
                    : 'bg-[#181d28] border border-[#2b3344] text-[#a2aab8] hover:text-white'
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
                  className="px-2.5 py-1.5 text-sm text-[#d4af37] hover:underline whitespace-nowrap ml-1"
                >
                  Reset all
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Tabs with scroll arrows */}
          <div className="relative flex items-center gap-2 max-w-full">
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
              className={`shrink-0 w-9 h-9 rounded-md border flex items-center justify-center transition-colors ${
                canScrollLeft
                  ? 'bg-[#151922] border-[#d4af37]/50 text-[#d4af37] hover:bg-[#1f2533] hover:border-[#d4af37]'
                  : 'bg-[#12151c] border-[#232938] text-[#4a5160] cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={categoryScrollRef}
              className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none text-sm"
            >
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    title={cat}
                    className={`px-3.5 sm:px-4 py-2.5 rounded-md font-medium whitespace-nowrap shrink-0 snap-start transition-all ${
                      isActive
                        ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                        : 'bg-[#151922] text-[#9aa2b2] hover:text-white hover:bg-[#1f2533] border border-[#232938]'
                    }`}
                  >
                    {menuCategoryLabel(cat)}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollCategories('right')}
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
              className={`shrink-0 w-9 h-9 rounded-md border flex items-center justify-center transition-colors ${
                canScrollRight
                  ? 'bg-[#151922] border-[#d4af37]/50 text-[#d4af37] hover:bg-[#1f2533] hover:border-[#d4af37]'
                  : 'bg-[#12151c] border-[#232938] text-[#4a5160] cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Menu Grid Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Active status indicator & results count */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-8 pb-3 border-b border-[#1c212c] text-sm text-[#828a9b]">
          <div className="min-w-0">
            Showing <span className="font-semibold text-white tabular-nums">{filteredItems.length}</span> items
            {activeCategory !== 'All' && (
              <span>
                {' '}
                in <strong className="text-[#d4af37]">{menuCategoryLabel(activeCategory, 'full')}</strong>
              </span>
            )}
            {searchQuery && <span> matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;</span>}
          </div>
          <div className="text-xs sm:text-sm text-[#717a8c] italic sm:text-right sm:max-w-md shrink-0">
            *Synced with DoorDash Korea House — prices and availability may change on delivery apps.
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-[#13161f] border border-[#232938] rounded-xl p-8">
            <div className="p-4 bg-[#1f2533] rounded-full text-[#d4af37] mb-3">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">No menu items found</h3>
            <p className="text-sm text-[#8a92a3] mt-1 max-w-md">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setSpicyOnly(false);
                setSignatureOnly(false);
              }}
              className="mt-5 px-5 py-2.5 bg-[#1f2533] hover:bg-[#2a3245] text-white text-xs font-semibold rounded-md border border-[#343e54] transition-colors"
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
      <section className="bg-[#12151d] border-t border-[#1d222e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-[#171b26] border border-[#282f42] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#9e2a2b]/20 border border-[#9e2a2b]/40 flex items-center justify-center shrink-0">
            <span className="font-serif text-2xl font-bold text-[#ff8080]">반찬</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Complimentary Banchan with Every Korean Entree
            </h3>
            <p className="text-xs sm:text-sm text-[#9aa2b2] mt-1.5 leading-relaxed">
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
