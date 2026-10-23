import React from 'react';
import { X, Phone, MapPin, Clock, ExternalLink, CheckCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDishName?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, selectedDishName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#DBEAFE] border border-[#CBD5E1] rounded-xl max-w-lg w-full p-6 sm:p-8 text-[#0F172A] relative shadow-2xl max-h-[min(90dvh,640px)] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#1E40AF] rounded-lg hover:bg-[#E2E8F0] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">
              Pickup &amp; Delivery
            </span>
            <h2 id="order-modal-title" className="font-serif text-2xl font-bold text-white mt-1">
              Order from Korea House
            </h2>
            {selectedDishName ? (
              <p className="text-sm text-[#64748B] mt-1">
                Interested in <span className="text-[#0F172A] font-semibold">{selectedDishName}</span>? Place your order online or call the restaurant.
              </p>
            ) : (
              <p className="text-sm text-[#64748B] mt-1">
                Enjoy authentic Korean BBQ, homestyle stews, and fresh sushi prepared to order.
              </p>
            )}
          </div>

          <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-5 rounded-lg flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#F97316]/20 border border-[#F97316]/40 rounded-full text-[#FB923C]">
                <ExternalLink className="w-5 h-5 text-[#FDBA74]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Order Online</h3>
                <p className="text-xs text-[#64748B]">Pickup or delivery through our online ordering partner</p>
              </div>
            </div>

            <a
              href={RESTAURANT_INFO.onlineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#F97316] hover:bg-[#FB923C] active:bg-[#EA580C] text-white font-semibold text-center rounded-md text-base transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Order Online Now</span>
            </a>
          </div>

          <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-5 rounded-lg flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#E2E8F0] border border-[#94A3B8] rounded-full text-[#2563EB]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Call Restaurant Directly</h3>
                <p className="text-xs text-[#64748B]">Fastest for hot pickup &amp; custom banchan requests</p>
              </div>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="w-full py-3 px-4 bg-[#E2E8F0] hover:bg-[#DBEAFE] text-white font-semibold text-center rounded-md text-base transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call (972) 243-0434</span>
            </a>
          </div>

          <div className="space-y-3 text-xs text-[#64748B]">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1E293B] block">Pickup Location</strong>
                <span>2598 Royal Lane, Dallas, TX 75229 (Royal Lane Koreatown)</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1E293B] block">Kitchen Hours</strong>
                <span>Daily 11:00 AM – 9:30 PM for takeout</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1E293B] block">Authentic Banchan Included</strong>
                <span>All Korean entrees come with our chef&apos;s daily assortment of seasoned side dishes and steamed rice.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
