import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/ui/icon'
import BookingModal from './BookingModal'
import EditorPanel from './EditorPanel'
import { loadContent } from './siteContent'
import type { SiteContent } from './siteContent'

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [content, setContent] = useState<SiteContent>(loadContent)

  const g = content.global
  const accent = g.accentColor
  const text = g.textColor
  const muted = g.mutedColor
  const btn = g.buttonColor
  const btnTxt = g.buttonTextColor
  const bg = g.bgColor

  const NAV_ITEMS = [
    { label: 'О нас', href: '#about' },
    { label: 'Тарифы', href: '#pricing' },
    { label: 'Преимущества', href: '#features' },
    { label: 'График работы', href: '#schedule' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Забронировать', href: '#booking', highlight: true },
  ]

  return (
    <div style={{ backgroundColor: bg, color: text, fontFamily: g.fontFamily }} className="min-h-screen">
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <EditorPanel content={content} onChange={setContent} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ backgroundColor: `${bg}ee`, backdropFilter: 'blur(8px)', borderBottom: `1px solid ${btn}44` }}>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>{content.header.badge}</p>
          <h1 className="text-lg font-bold leading-tight" style={{ color: text }}>{content.header.title}</h1>
          <p className="text-xs" style={{ color: muted }}>{content.header.subtitle}</p>
        </div>
        <button onClick={() => setMenuOpen(true)} className="p-2" style={{ color: accent }}>
          <Icon name="Menu" size={26} />
        </button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: bg }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>{content.header.badge}</p>
                <h1 className="text-lg font-bold" style={{ color: text }}>{content.header.title}</h1>
              </div>
              <button onClick={() => setMenuOpen(false)} style={{ color: accent }}>
                <Icon name="X" size={26} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.button key={item.href}
                  className="text-left text-3xl py-3 font-serif border-b transition-colors"
                  style={{ borderColor: `${btn}33`, color: item.highlight ? accent : text }}
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  onClick={() => {
                    setMenuOpen(false)
                    if (item.highlight) { setBookingOpen(true) }
                    else { setTimeout(() => scrollTo(item.href), 300) }
                  }}>
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <a href={`tel:${content.header.phone.replace(/\s/g, '')}`} className="block text-xl font-bold mb-4" style={{ color: text }}>
                {content.header.phone}
              </a>
              <div className="flex gap-3">
                <a href={content.header.telegramUrl} target="_blank" rel="noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ border: `1px solid ${btn}55`, color: accent }}>
                  <Icon name="Send" size={18} />
                </a>
                <a href={content.header.whatsappUrl} target="_blank" rel="noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ border: `1px solid ${btn}55`, color: accent }}>
                  <Icon name="MessageCircle" size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-16 px-5 md:px-12"
        style={{ paddingTop: '80px' }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.hero.bgImage})` }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${bg}44 0%, ${bg}ee 100%)` }} />
        <div className="relative z-10 max-w-xl">
          <motion.p className="text-sm tracking-widest uppercase mb-3" style={{ color: accent }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {content.hero.label}
          </motion.p>
          <motion.h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: text }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {content.hero.title}
          </motion.h2>
          <motion.button onClick={() => setBookingOpen(true)}
            className="px-8 py-4 rounded-full text-base font-bold transition-all"
            style={{ backgroundColor: btn, color: btnTxt }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            whileHover={{ opacity: 0.88 }}>
            {content.hero.buttonText}
          </motion.button>
        </div>
      </section>

      {/* О НАС */}
      <section id="about" className="px-5 md:px-12 py-16 md:py-24 max-w-3xl">
        <motion.h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8" style={{ color: text }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {content.about.title}
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <p className="mb-4" style={{ color: muted }}>{content.about.listTitle}</p>
          <ul className="space-y-2" style={{ color: accent }}>
            {content.about.items.map((item) => (
              <li key={item} className="flex items-start gap-2" style={{ color: `${text}cc` }}>
                <span style={{ color: accent }}>—</span> {item}
              </li>
            ))}
          </ul>
          <button onClick={() => setBookingOpen(true)}
            className="mt-8 px-8 py-4 rounded-full font-bold transition-all"
            style={{ backgroundColor: btn, color: btnTxt }}>
            {content.about.buttonText}
          </button>
        </motion.div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="features" className="px-5 md:px-12 py-16 md:py-24" style={{ backgroundColor: `${btn}18` }}>
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={{ color: text }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {content.features.title}
        </motion.h2>
        <div className="max-w-xl mx-auto space-y-6">
          {content.features.items.map((item, i) => (
            <motion.div key={i} className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}>
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: btn, color: btnTxt }}>{i + 1}</div>
              <p className="pt-1.5 text-base" style={{ color: `${text}cc` }}>{item}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => setBookingOpen(true)}
            className="px-8 py-4 rounded-full font-bold transition-all"
            style={{ backgroundColor: btn, color: btnTxt }}>
            {content.features.buttonText}
          </button>
        </div>
      </section>

      {/* ТАРИФЫ */}
      <section id="pricing" className="px-5 md:px-12 py-16 md:py-24">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: text }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {content.pricing.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          {content.pricing.plans.map((plan, i) => (
            <motion.div key={i} className="rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: plan.highlight ? `${btn}22` : `${btn}0e`, border: `1px solid ${plan.highlight ? accent : btn + '44'}` }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              {plan.image && (
                <div className="w-full h-40 bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${plan.image})` }} />
              )}
              <div className="p-6 flex flex-col flex-1">
              {plan.highlight && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full self-start mb-3"
                  style={{ backgroundColor: btn, color: btnTxt }}>Популярный</span>
              )}
              <p className="text-sm mb-1" style={{ color: accent }}>{plan.duration}</p>
              <h3 className="text-xl font-bold mb-1" style={{ color: text }}>{plan.name}</h3>
              <p className="text-3xl font-bold mb-4" style={{ color: plan.highlight ? accent : text }}>{plan.price}</p>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: muted }}>
                    <Icon name="Check" size={14} style={{ color: accent }} /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setBookingOpen(true)}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
                style={plan.highlight
                  ? { backgroundColor: btn, color: btnTxt }
                  : { backgroundColor: 'transparent', color: accent, border: `1px solid ${btn}55` }}>
                Выбрать
              </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ГРАФИК РАБОТЫ */}
      <section id="schedule" className="px-5 md:px-12 py-16 md:py-24" style={{ backgroundColor: `${btn}18` }}>
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: text }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {content.schedule.title}
        </motion.h2>
        <div className="max-w-2xl grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-bold mb-4" style={{ color: accent }}>{content.schedule.scheduleTitle}</p>
            <ul className="space-y-2 text-sm">
              {content.schedule.hours.map(d => (
                <li key={d} className="flex items-center gap-2" style={{ color: `${text}bb` }}>
                  <span style={{ color: btn }}>•</span> {d}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <p className="font-bold mb-4" style={{ color: accent }}>{content.schedule.priceTitle}</p>
            <div className="space-y-4 text-sm" style={{ color: `${text}bb` }}>
              <p>{content.schedule.priceWeekend}</p>
              <p>{content.schedule.priceWeekday}</p>
            </div>
            <button onClick={() => setBookingOpen(true)}
              className="mt-6 px-6 py-3 rounded-full font-bold text-sm transition-all"
              style={{ backgroundColor: btn, color: btnTxt }}>
              {content.schedule.buttonText}
            </button>
          </motion.div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="px-5 md:px-12 py-16 md:py-24">
        <motion.h2 className="text-3xl font-bold mb-8" style={{ color: text }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {content.contacts.title}
        </motion.h2>
        <div className="max-w-sm space-y-5">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: accent }}>Телефон</p>
            <a href={`tel:${content.contacts.phone.replace(/\s/g, '')}`} className="text-2xl font-bold" style={{ color: text }}>
              {content.contacts.phone}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: accent }}>Адрес</p>
            <p style={{ color: `${text}bb` }}>{content.contacts.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: accent }}>Мессенджеры</p>
            <div className="flex gap-3">
              <a href={content.header.telegramUrl} target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{ border: `1px solid ${btn}55`, color: accent }}>
                <Icon name="Send" size={20} />
              </a>
              <a href={content.header.whatsappUrl} target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{ border: `1px solid ${btn}55`, color: accent }}>
                <Icon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 md:px-12 py-8 text-center text-xs" style={{ borderTop: `1px solid ${btn}33`, color: `${muted}88` }}>
        © 2024 {content.header.title} · {content.header.subtitle}
      </footer>

      {/* STICKY BOOKING */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden"
        style={{ background: `linear-gradient(to top, ${bg} 60%, transparent)` }}>
        <button onClick={() => setBookingOpen(true)}
          className="w-full py-4 rounded-full font-bold text-base"
          style={{ backgroundColor: btn, color: btnTxt }}>
          Забронировать вечер
        </button>
      </div>
    </div>
  )
}