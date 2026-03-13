import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, X, Moon, Sun, MessageCircle, 
  Truck, CheckCircle, Play, ShoppingCart, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { id: 1, name: 'Premium Silk Robe', price: 12500, img: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=800' },
  { id: 2, name: 'Soft Cotton Spa', price: 8900, img: 'https://s.alicdn.com/@sc03/kf/H414476afb37d48c4874aabeba95ac3b2s.png' },
  { id: 3, name: 'Luxury Velvet Night', price: 15200, img: 'https://www.night-store.co.uk/cdn/shop/files/ECOM_LOOK_12_002_f01db281-ac57-47f5-905d-014cdccb1493.jpg' },
  { id: 4, name: 'Bamboo Eco Robe', price: 9400, img: 'https://i.pinimg.com/736x/74/73/bd/7473bdccfcd1128294e28356840d9823.jpg' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (p) => {
    setCart([...cart, p]);
    setIsCartOpen(true);
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-500`}>
      
      {/* 5. Локальный контекст (Top Bar) */}
      <div className="bg-cyan-500 text-white text-[9px] font-black py-2 text-center uppercase tracking-widest">
        Доставка по Бишкеку в день заказа 🇰🇬
      </div>

      <nav className="sticky top-0 z-40 px-6 py-4 flex justify-between items-center bg-inherit/80 backdrop-blur-md border-b border-current/5">
        <div className="text-xl font-serif font-black tracking-tighter">ROBE.LUXE</div>
        <div className="flex items-center gap-5">
          <button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* 3. Hero с видео-эффектом */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px]" 
          alt="Luxury Background"
        />
        <div className="relative z-20 text-center text-white px-6">
          <motion.h1 initial={{y: 20}} animate={{y: 0}} className="text-5xl md:text-8xl font-serif italic mb-6">Masterpiece</motion.h1>
          <p className="text-[10px] uppercase font-bold tracking-[0.5em] opacity-70">Define Your Comfort</p>
        </div>
      </header>

      {/* 2. Как мы работаем (3 шага) */}
      <section className="py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {[
          { icon: ShoppingCart, t: 'Выбор', d: 'Выбираете модель и размер' },
          { icon: MessageCircle, t: 'WhatsApp', d: 'Уточняем детали заказа' },
          { icon: Truck, t: 'Доставка', d: 'Получаете халат через 24ч' }
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <step.icon className="text-cyan-500 mb-4" size={32} strokeWidth={1} />
            <h3 className="text-xs font-black uppercase mb-2">{step.t}</h3>
            <p className="text-[10px] opacity-60 leading-relaxed">{step.d}</p>
          </div>
        ))}
      </section>

      {/* Catalog */}
      <main className="px-6 max-w-7xl mx-auto pb-32 grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} className="group" onClick={() => addToCart(p)}>
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-100 mb-4 relative cursor-pointer shadow-lg transition-transform group-hover:scale-[0.98]">
              <img src={p.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-[9px] font-black uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full">Add To Cart</span>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-[11px] font-bold mb-1">{p.name}</h4>
              <p className="text-[11px] font-black text-cyan-500">{p.price} сом</p>
            </div>
          </div>
        ))}
      </main>

      {/* 4. Side Cart (Боковая корзина) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]" />
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} className={`fixed top-0 right-0 h-full w-full max-w-sm z-[60] p-8 flex flex-col shadow-2xl ${isDarkMode ? 'bg-[#111]' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-serif font-black">Bag ({cart.length})</h2>
                <button onClick={()=>setIsCartOpen(false)}><X/></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center border-b border-current/5 pb-4">
                    <img src={item.img} className="w-16 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold">{item.name}</p>
                      <p className="text-[10px] font-black text-cyan-500">{item.price} сом</p>
                    </div>
                    <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))}><Trash2 size={14} className="text-slate-300" /></button>
                  </div>
                ))}
              </div>
              <button className="w-full bg-cyan-500 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest mt-6" onClick={() => window.open('https://wa.me/996XXXXXX')}>
                Checkout via WhatsApp
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1. Плавающая кнопка связи (FAB) */}
      <button 
        className="fixed bottom-8 right-8 z-[40] bg-cyan-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90"
        onClick={() => window.open('https://wa.me/996XXXXXX')}
      >
        <MessageCircle size={28} />
      </button>

    </div>
  );
}