import React, { useEffect, useRef, useState } from 'react';
import { UtensilsCrossed, Flame } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { menuCategoryLabel } from '../utils/menuCategoryLabel';

interface FoodCardProps {
  item: MenuItem;
  onSelect?: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const [popped, setPopped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popped) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!cardRef.current?.contains(event.target as Node)) {
        setPopped(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [popped]);

  const togglePop = () => {
    // Mobile / coarse pointer: tap toggles dramatic pop-out
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      setPopped((prev) => !prev);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`food-3d ${popped ? 'is-popped' : ''}`}
      onClick={togglePop}
    >
      <div className="food-3d-inner group bg-[#151821] border border-[#232733] rounded-lg overflow-hidden flex flex-col justify-between min-w-0 h-full">
        <div>
          <div className="relative aspect-[4/3] w-full bg-[#1c202b] overflow-hidden">
            {item.image && !imageError ? (
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="food-3d-img w-full h-full object-cover object-center"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1a1e28] to-[#12151c] text-[#717a8c]">
                <div className="p-3 bg-[#232836] rounded-full mb-2">
                  <UtensilsCrossed className="w-6 h-6 text-[#d4af37]" />
                </div>
                <span className="text-sm uppercase tracking-wider text-[#9aa2b2] font-medium line-clamp-2 px-2">
                  {menuCategoryLabel(item.category, 'full')}
                </span>
                <span className="text-base font-semibold text-[#e6e2d8] mt-1 line-clamp-1">
                  {item.name}
                </span>
              </div>
            )}

            {item.spicyLevel && item.spicyLevel > 0 ? (
              <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-medium text-[#ff6b6b] flex items-center gap-1 border border-red-900/40">
                <Flame className="w-3 h-3 text-[#ff6b6b]" />
                <span>{'Spicy '.repeat(Math.min(item.spicyLevel, 2)).trim()}</span>
              </div>
            ) : null}

            <div className="absolute bottom-2.5 left-2.5 sm:hidden rounded-full bg-black/65 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30">
              Tap for 3D
            </div>
          </div>

          <div className="p-5 flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-[#8a92a3]">
              <span className="line-clamp-2">{menuCategoryLabel(item.category, 'full')}</span>
              {item.koreanName && (
                <>
                  <span aria-hidden="true" className="text-[#3c4456]">·</span>
                  <span className="text-[#c59b27] font-medium">{item.koreanName}</span>
                </>
              )}
              {item.isSignature && (
                <>
                  <span aria-hidden="true" className="text-[#3c4456]">·</span>
                  <span className="text-[#d4af37] font-semibold">House Specialty</span>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#f5f2eb] group-hover:text-[#d4af37] transition-colors leading-snug break-words min-w-0">
                {item.name}
              </h3>
              <span className="text-base sm:text-lg font-semibold text-[#e8c56c] font-mono tabular-nums shrink-0 self-start sm:self-auto">
                {item.price}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#9aa2b2] leading-relaxed line-clamp-3">
              {item.description}
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-[#1d222e] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-[#7d8799]">
          <div className="flex items-center gap-1.5 min-w-0">
            {item.tags && item.tags.length > 0 ? (
              item.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  {idx > 0 && <span aria-hidden="true" className="text-[#3a4154]">·</span>}
                  <span className="truncate">{tag}</span>
                </React.Fragment>
              ))
            ) : (
              <span>Made fresh to order</span>
            )}
          </div>
          {onSelect && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className="text-sm font-semibold text-[#d4af37] hover:text-[#f0d47e] transition-colors whitespace-nowrap self-start sm:ml-2"
            >
              Order / Inquire &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
