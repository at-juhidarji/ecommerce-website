import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Lock, Smartphone, CreditCard, Truck, Check, ShieldCheck } from 'lucide-react';

const VastraCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const paymentIcons = {
    upi: [
      { name: 'GPay', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg' },
      { name: 'PhonePe', url: 'https://cdn.worldvectorlogo.com/logos/phonepe-1.svg' },
      { name: 'Paytm', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg' }
    ],
    card: [
      { name: 'Visa', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
      { name: 'Mastercard', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }
    ]
  };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 p-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button className="group flex items-center text-xs font-bold uppercase tracking-widest hover:opacity-50 transition">
            <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
            Store
          </button>
          <span className="font-black tracking-[0.4em] text-2xl uppercase">Vastra.co</span>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
            <ShieldCheck size={14} className="text-zinc-900" /> Secure
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
        
        {/* Left: Form Fields (7 Columns) */}
        <section className="lg:col-span-7 p-6 md:p-16 border-r border-zinc-100">
          <motion.div variants={containerVars} initial="hidden" animate="visible" className="max-w-xl ml-auto">
            
            <header className="mb-12">
              <h1 className="text-4xl font-light tracking-tight mb-2">Finalize Order</h1>
              <p className="text-zinc-400 text-sm">Please enter your shipping and payment details below.</p>
            </header>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              {/* Contact */}
              <motion.div variants={itemVars}>
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-4">Contact</h2>
                <input type="email" placeholder="Email for order tracking" className="w-full border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300" />
              </motion.div>

              {/* Shipping */}
              <motion.div variants={itemVars}>
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-8 mb-4">
                  <input type="text" placeholder="First Name" className="w-full border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300" />
                  <input type="text" placeholder="Last Name" className="w-full border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300" />
                </div>
                <input type="text" placeholder="Flat, House no., Building, Company, Apartment" className="w-full border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300 mb-4" />
                <div className="grid grid-cols-3 gap-8">
                  <input type="text" placeholder="City" className="w-full border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300" />
                  <input type="text" placeholder="State" className="w-full border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300" />
                  <input type="text" placeholder="Pincode" className="w-full border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-300" />
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div variants={itemVars} className="space-y-4">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-4">Payment Method</h2>
                
                {[
                  { id: 'upi', label: 'UPI (Google Pay, PhonePe, Paytm)', icon: <Smartphone size={18} /> },
                  { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
                  { id: 'cod', label: 'Cash on Delivery', icon: <Truck size={18} /> }
                ].map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`group relative flex flex-col p-5 border cursor-pointer transition-all duration-300 ${
                      paymentMethod === method.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <span className={paymentMethod === method.id ? 'text-zinc-900' : 'text-zinc-300'}>{method.icon}</span>
                        <span className="text-sm font-semibold tracking-tight">{method.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        paymentMethod === method.id ? 'border-zinc-900' : 'border-zinc-200'
                      }`}>
                        {paymentMethod === method.id && <div className="w-2 h-2 bg-zinc-900 rounded-full" />}
                      </div>
                    </div>

                    {/* App Logos for attractiveness */}
                    <div className="flex gap-4 items-center ml-9">
                      {method.id === 'upi' && paymentIcons.upi.map((app) => (
                        <img key={app.name} src={app.url} alt={app.name} className={`h-3 w-auto transition-all ${paymentMethod === 'upi' ? 'grayscale-0 opacity-100' : 'grayscale opacity-30'}`} />
                      ))}
                      {method.id === 'card' && paymentIcons.card.map((app) => (
                        <img key={app.name} src={app.url} alt={app.name} className={`h-4 w-auto transition-all ${paymentMethod === 'card' ? 'grayscale-0 opacity-100' : 'grayscale opacity-30'}`} />
                      ))}
                    </div>
                  </div>
                ))}

                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-6 bg-zinc-50 border border-zinc-100 space-y-4">
                        <input type="text" placeholder="Card number" className="w-full bg-transparent border-b border-zinc-200 py-2 outline-none focus:border-zinc-900 transition-colors" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Expiry MM/YY" className="w-full bg-transparent border-b border-zinc-200 py-2 outline-none focus:border-zinc-900 transition-colors" />
                          <input type="text" placeholder="CVV" className="w-full bg-transparent border-b border-zinc-200 py-2 outline-none focus:border-zinc-900 transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <button className="w-full bg-zinc-900 text-white py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all active:scale-[0.99] shadow-xl shadow-zinc-200">
                Complete Purchase
              </button>
            </form>
          </motion.div>
        </section>

        {/* Right: Summary (5 Columns) */}
        <section className="lg:col-span-5 bg-zinc-50/50 p-6 md:p-16">
          <div className="sticky top-32 max-w-sm mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-8">Your Selection</h2>
            
            <div className="flex gap-6 mb-10 pb-10 border-b border-zinc-100">
              <div className="relative group overflow-hidden bg-white border border-zinc-200 p-2">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400" 
                  alt="Vastra Product" 
                  className="w-24 h-32 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold tracking-tighter italic">Oversized Ghost Tee</h3>
                <p className="text-zinc-500 text-sm">Size XL / Arctic White</p>
                <p className="mt-2 font-mono text-sm tracking-widest text-zinc-400">ITEM #VA-9920</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm tracking-tight">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="font-bold">₹2,499.00</span>
              </div>
              <div className="flex justify-between text-sm tracking-tight">
                <span className="text-zinc-500 font-medium">Standard Shipping</span>
                <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-6 border-t border-zinc-200 tracking-tighter">
                <span>Total</span>
                <span>₹2,499.00</span>
              </div>
            </div>

            <div className="mt-12 p-4 bg-white border border-dashed border-zinc-200 text-center">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  Estimated Delivery: April 14 — April 18
                </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VastraCheckout;