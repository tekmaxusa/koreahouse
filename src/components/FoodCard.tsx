import React, { useState } from 'react';
import { UtensilsCrossed, Flame } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { menuCategoryLabel } from '../utils/menuCategoryLabel';

interface FoodCardProps {
  item: MenuItem;
  onSelect?: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onSelect }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#93C5FD] rounded-lg overflow-hidden transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-900/10 min-w-0 h-full">
      <div>
        {/* Image Container with Zero-Broken-Image Fallback */}
        <div className="relative aspect-[4/3] w-full bg-[#F1F5F9] overflow-hidden">
          {item.image && !imageError ? (
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] text-[#64748B]">
              <div className="p-3 bg-[#DBEAFE] rounded-full mb-2">
                <UtensilsCrossed className="w-6 h-6 text-[#2563EB]" />
              </div>
              <span className="text-sm uppercase tracking-wider text-[#64748B] font-medium line-clamp-2 px-2">
                {menuCategoryLabel(item.category, 'full')}
              </span>
              <span className="text-base font-semibold text-[#1E293B] mt-1 line-clamp-1">
                {item.name}
              </span>
            </div>
          )}

          {/* Sizzling / Spicy indicator if present */}
          {item.spicyLevel && item.spicyLevel > 0 ? (
            <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-medium text-[#F97316] flex items-center gap-1 border border-orange-400/50">
              <Flame className="w-3 h-3 text-[#F97316]" />
              <span>{'Spicy '.repeat(Math.min(item.spicyLevel, 2)).trim()}</span>
            </div>
          ) : null}
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-2">
          {/* Metadata: Unboxed quiet text with separators */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-[#64748B]">
            <span className="line-clamp-2">{menuCategoryLabel(item.category, 'full')}</span>
            {item.koreanName && (
              <>
                <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                <span className="text-[#2563EB] font-medium">{item.koreanName}</span>
              </>
            )}
            {item.isSignature && (
              <>
                <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                <span className="text-[#2563EB] font-semibold">House Specialty</span>
              </>
            )}
          </div>

          {/* Title and Price */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug break-words min-w-0">
              {item.name}
            </h3>
            <span className="text-base sm:text-lg font-semibold text-[#F97316] font-mono tabular-nums shrink-0 self-start sm:self-auto">
              {item.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Action / Tags Footer */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-[#64748B]">
        <div className="flex items-center gap-1.5 min-w-0">
          {item.tags && item.tags.length > 0 ? (
            item.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true" className="text-[#CBD5E1]">·</span>}
                <span className="truncate">{tag}</span>
              </React.Fragment>
            ))
          ) : (
            <span>Made fresh to order</span>
          )}
        </div>
        {onSelect && (
          <button
            onClick={() => onSelect(item)}
            className="text-sm font-semibold text-[#2563EB] hover:text-[#60A5FA] transition-colors whitespace-nowrap self-start sm:ml-2"
          >
            Order / Inquire &rarr;
          </button>
        )}
      </div>
    </div>
  );
};
