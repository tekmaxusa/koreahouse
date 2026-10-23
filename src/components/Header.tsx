import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty('--site-header-height', `${el.offsetHeight}px`);
    };

    syncHeaderHeight();
    const ro = new ResizeObserver(syncHeaderHeight);
    ro.observe(el);
    window.addEventListener('resize', syncHeaderHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncHeaderHeight);
    };
  }, [scrolled, mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Korean Cuisine', path: '/korean-cuisine' },
    { label: 'Sushi', path: '/sushi' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full max-w-[100vw] transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-[#E2E8F0] shadow-lg shadow-blue-900/10 py-3'
          : 'bg-[#FFFFFF] border-[#BFDBFE] py-4'
      }`}
    >
      {/* Top micro-bar for quick address and hours */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 hidden md:flex items-center justify-between text-xs text-[#64748B] border-b border-[#E2E8F0] pb-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>2598 Royal Lane, Dallas, TX 75229</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Open Daily 11:00 AM – 10:00 PM</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#2563EB] font-medium tracking-wide">Serving Dallas Koreatown Since 1979</span>
          <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="hover:text-[#1E40AF] transition-colors font-medium text-[#2563EB]"
          >
            {RESTAURANT_INFO.phone}
          </a>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (Action CTA) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6 min-w-0">
        {/* Zone 1: Brand Wordmark */}
        <Link to="/" className="flex flex-col min-w-0 max-w-[55%] sm:max-w-none shrink group">
          <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate sm:whitespace-nowrap">
            KOREA HOUSE
          </span>
          <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#EA580C] font-semibold">
            Korean Cuisine &amp; Sushi
          </span>
        </Link>

        {/* Zone 2: Navigation Links (Single line, text with clean active indicator) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#475569]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#0F172A] font-semibold'
                    : 'text-[#64748B] hover:text-[#1E40AF]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Single line button) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#334155] bg-[#F8FAFC] border border-[#CBD5E1] rounded-md hover:bg-[#E2E8F0] hover:text-[#1E40AF] transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>(972) 243-0434</span>
          </a>
          <a
            href={RESTAURANT_INFO.onlineOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#F97316] hover:bg-[#FB923C] active:bg-[#EA580C] rounded-md shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            Order Online
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={RESTAURANT_INFO.onlineOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#F97316] hover:bg-[#FB923C] rounded-md transition-colors whitespace-nowrap"
          >
            Order
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#475569] hover:text-[#1E40AF] hover:bg-[#F8FAFC] rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 sm:px-6 py-6 shadow-2xl flex flex-col gap-4 z-50 overflow-y-auto"
          style={{
            top: 'var(--site-header-height, 4.5rem)',
            maxHeight: 'calc(100dvh - var(--site-header-height, 4.5rem))',
          }}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E2E8F0] text-[#2563EB] font-semibold'
                      : 'text-[#475569] hover:bg-[#EFF6FF] hover:text-[#1E40AF]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-3">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-[#0F172A] bg-[#E2E8F0] border border-[#CBD5E1] rounded-md hover:bg-[#EFF6FF] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#2563EB]" />
              <span>Call (972) 243-0434</span>
            </a>
            <a
              href={RESTAURANT_INFO.onlineOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-sm font-semibold text-white bg-[#F97316] hover:bg-[#FB923C] rounded-md transition-colors text-center"
            >
              Order Online
            </a>
            <div className="text-center text-xs text-[#64748B] mt-2">
              <p>2598 Royal Lane, Dallas, TX 75229</p>
              <p className="mt-0.5">Open Daily 11:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
