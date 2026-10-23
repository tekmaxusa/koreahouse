import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Send,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!formData.name.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setFormError('Please enter a message of at least 10 characters.');
      return;
    }

    setFormStatus('submitting');
    // Simulated handling with clear demo explanation as required
    setTimeout(() => {
      setFormStatus('submitted');
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#2563EB] font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Dallas Koreatown</span>
            </div>
            <h1 className="page-heading text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Contact &amp; Location
            </h1>
            <p className="page-subheading mt-3 max-w-2xl">
              We are located at 2598 Royal Lane in Dallas, Texas. Stop by for authentic Korean BBQ and fresh sushi, call for hot takeout orders, or send us a message.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="px-5 py-3 bg-[#F97316] hover:bg-[#FB923C] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call (972) 243-0434</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid: Details / Map / Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (5 cols): Restaurant Contact & Hours */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Address Card */}
            <div className="bg-[#F1F5F9] border border-[#E2E8F0] p-6 sm:p-8 rounded-xl flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#2563EB]" />
                <span>Restaurant Location</span>
              </span>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                  Korea House Korean Cuisine &amp; Sushi
                </h3>
                <p className="text-sm text-[#64748B] mt-1">
                  2598 Royal Lane
                  <br />
                  Dallas, TX 75229
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Asian Trade District / Royal Lane Koreatown
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#CBD5E1] text-xs font-semibold text-[#1E40AF] rounded-md transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Get Directions</span>
                </a>
                <button
                  onClick={handleCopyAddress}
                  className="px-4 py-2 bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#2a3244] text-xs font-medium text-[#c0c7d6] rounded-md transition-colors flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phone & Inquiries Card */}
            <div className="bg-[#F1F5F9] border border-[#E2E8F0] p-6 sm:p-8 rounded-xl flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#2563EB]" />
                <span>Telephone Orders &amp; Reservations</span>
              </span>

              <div>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="font-mono text-2xl font-bold text-[#1E40AF] hover:text-[#2563EB] transition-colors tabular-nums block"
                >
                  (972) 243-0434
                </a>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Direct line for table inquiries, lunch bento orders, party takeout platters, and daily special inquiries.
                </p>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#F1F5F9] border border-[#E2E8F0] p-6 sm:p-8 rounded-xl flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>Verified Operating Hours</span>
              </span>

              <div className="divide-y divide-[#E2E8F0] text-xs">
                {RESTAURANT_INFO.hours.map((h) => (
                  <div key={h.day} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-[#1E293B]">{h.day}</span>
                    <span className="text-[#64748B] font-mono tabular-nums">{h.full}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-[#64748B] leading-relaxed">
                * Lunch specials available daily 11:00 AM – 3:00 PM. Dinner menu served all day.
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Map & Contact Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Interactive Google Map Embed Frame */}
            <div className="bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#c0c7d6]">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                  <span className="font-medium">Map: 2598 Royal Ln, Dallas, TX 75229</span>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-[320px] bg-[#EFF6FF]">
                <iframe
                  title="Korea House Dallas Google Maps Location"
                  src="https://maps.google.com/maps?q=2598+Royal+Lane,+Dallas,+TX+75229&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Contact & Inquiry Form */}
            <div className="bg-[#F1F5F9] border border-[#E2E8F0] p-6 sm:p-8 rounded-xl flex flex-col gap-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">
                  Get In Touch
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A] mt-1">
                  Send a Message or Catering Inquiry
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Have a question about large group bookings, private events, or dietary needs? Send us a note below.
                </p>
              </div>

              {formStatus === 'submitted' ? (
                <div className="bg-[#17231c] border border-emerald-900/60 p-6 rounded-lg flex flex-col gap-3 text-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <strong className="text-base font-semibold text-emerald-300">Message Received (Demo Mode)</strong>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald-100/90">
                    Thank you, <span className="font-semibold text-white">{formData.name}</span>. In a live production deployment, this form triggers a backend notification or email dispatch to Korea House.
                  </p>
                  <p className="text-xs text-emerald-200/80">
                    For immediate service, table bookings, or hot takeout orders, please call the restaurant directly at{' '}
                    <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="underline font-bold text-white">
                      (972) 243-0434
                    </a>.
                  </p>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="self-start mt-2 px-4 py-2 bg-emerald-800/40 hover:bg-emerald-800/60 border border-emerald-700/60 text-xs font-semibold rounded text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {formError && (
                    <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-md text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-1.5">
                        Your Name <span className="text-[#FB923C]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Min-Jun Park"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#2b3346] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-1.5">
                        Email Address <span className="text-[#FB923C]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#2b3346] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-1.5">
                        Phone Number <span className="text-[#64748B]">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(972) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#2b3346] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#2b3346] rounded-md text-sm text-white focus:outline-none focus:border-[#2563EB]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Group Reservation">Group Reservation</option>
                        <option value="Catering / Party Platters">Catering / Party Platters</option>
                        <option value="Dietary Questions">Dietary Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c0c7d6] mb-1.5">
                      Message <span className="text-[#FB923C]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know how we can help..."
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#2b3346] rounded-md text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full sm:w-auto px-7 py-3 bg-[#F97316] hover:bg-[#FB923C] disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{formStatus === 'submitting' ? 'Submitting...' : 'Submit Message'}</span>
                    </button>
                    <span className="text-[11px] text-[#64748B] italic text-center sm:text-right">
                      *Demo state: For immediate orders call (972) 243-0434.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
