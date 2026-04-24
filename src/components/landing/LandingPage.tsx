import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/ui/icon'
import BookingModal from './BookingModal'

const NAV_ITEMS = [
  { label: 'О нас', href: '#about' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Преимущества', href: '#features' },
  { label: 'График работы', href: '#schedule' },
  { label: 'Контакты', href: '#contacts' },
  { label: 'Забронировать', href: '#booking', highlight: true },
]

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div style={{ backgroundColor: '#0d0508', color: '#f0d9de', fontFamily: 'Georgia, serif' }} className="min-h-screen">
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ backgroundColor: 'rgba(13,5,8,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #2a1018' }}>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#c4748a' }}>Лофт</p>
          <h1 className="text-lg font-bold leading-tight" style={{ color: '#f0d9de' }}>Эми Вайнхаус</h1>
          <p className="text-xs" style={{ color: '#a08088' }}>Кино · Караоке · Лофт</p>
        </div>
        <button onClick={() => setMenuOpen(true)} className="p-2" style={{ color: '#c4748a' }}>
          <Icon name="Menu" size={26} />
        </button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            style={{ backgroundColor: '#0d0508' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#c4748a' }}>Лофт</p>
                <h1 className="text-lg font-bold" style={{ color: '#f0d9de' }}>Эми Вайнхаус</h1>
              </div>
              <button onClick={() => setMenuOpen(false)} style={{ color: '#c4748a' }}>
                <Icon name="X" size={26} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  className="text-left text-3xl py-3 font-serif border-b transition-colors"
                  style={{ borderColor: '#1a0a0f', color: item.highlight ? '#c4748a' : '#f0d9de' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => { setMenuOpen(false); if (item.highlight) { setBookingOpen(true) } else { setTimeout(() => scrollTo(item.href), 300) } }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <a href="tel:+79991234567" className="block text-xl font-bold mb-4" style={{ color: '#f0d9de' }}>
                +7 999 123-45-67
              </a>
              <div className="flex gap-3">
                {['Send', 'MessageCircle'].map((icon) => (
                  <button key={icon} className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ border: '1px solid #3a1a22', color: '#c4748a' }}>
                    <Icon name={icon as 'Send'} size={18} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-16 px-5 md:px-12"
        style={{ paddingTop: '80px' }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/96100492-c7f7-4704-985c-419ed3d1e2ca/files/24a849a5-532f-4f82-b578-268c5481f53b.jpg)` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,5,8,0.3) 0%, rgba(13,5,8,0.85) 100%)' }} />
        <div className="relative z-10 max-w-xl">
          <motion.p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#c4748a' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Лофт-пространство нового формата
          </motion.p>
          <motion.h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: '#f0d9de' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Эми Вайнхаус — это кино, музыка и атмосфера.
          </motion.h2>
          <motion.button
            onClick={() => setBookingOpen(true)}
            className="px-8 py-4 rounded-full text-base font-bold transition-all"
            style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            whileHover={{ backgroundColor: '#9a2845' }}
          >
            Забронировать
          </motion.button>
        </div>
      </section>

      {/* О НАС */}
      <section id="about" className="px-5 md:px-12 py-16 md:py-24 max-w-3xl">
        <motion.h2
          className="text-3xl md:text-5xl font-bold leading-tight mb-8"
          style={{ color: '#f0d9de' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          «Эми Вайнхаус» — это уникальное пространство с отдельными залами, где могут отдохнуть от 2 до 20 гостей. Каждая компания найдёт занятие по душе.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          <p className="mb-4" style={{ color: '#a08088' }}>У нас можно:</p>
          <ul className="space-y-2" style={{ color: '#c9a8b0' }}>
            {[
              'Отметить день рождения',
              'Провести девичник, мальчишник',
              'Устроить романтическое свидание',
              'Посмотреть фильм из огромного каталога на большом экране',
              'Спеть в караоке с друзьями и устроить песенное соревнование',
              'Сразиться в настольные игры',
              'Подключить свою музыку и потанцевать',
              'И многое другое!',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: '#c4748a' }}>—</span> {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setBookingOpen(true)}
            className="mt-8 px-8 py-4 rounded-full font-bold transition-all"
            style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}
          >
            Оставить заявку
          </button>
        </motion.div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="features" className="px-5 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#110609' }}>
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ color: '#f0d9de' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Тебе у нас понравится, если ты ценишь:
        </motion.h2>
        <div className="max-w-xl mx-auto space-y-6">
          {[
            'Богатый выбор фильмов на самый взыскательный вкус',
            'Возможность исполнить любимую песню в кругу близких людей',
            'Атмосферу живой музыки и джазового лофта',
            'Чистоту и уют в залах',
            'Современную аудио и видео технику',
            'Большой экран с изображением Full HD и выше',
          ].map((item, i) => (
            <motion.div key={item} className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}>
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}>
                {i + 1}
              </div>
              <p className="pt-1.5 text-base" style={{ color: '#c9a8b0' }}>{item}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => setBookingOpen(true)}
            className="px-8 py-4 rounded-full font-bold transition-all"
            style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}
          >
            Оставить заявку
          </button>
        </div>
      </section>

      {/* ТАРИФЫ */}
      <section id="pricing" className="px-5 md:px-12 py-16 md:py-24">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10"
          style={{ color: '#f0d9de' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Тарифы
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          {[
            { name: 'Кино', duration: '3 часа', price: '4 900 ₽', features: ['До 8 человек', 'Проектор 4K', 'Звук Dolby', 'Пледы и пуфы'], highlight: false },
            { name: 'Звезда', duration: '4 часа', price: '7 900 ₽', features: ['До 12 человек', 'Кино + Кaраоке', 'Проф. микрофон', 'Фуршетная зона', 'Декор в подарок'], highlight: true },
            { name: 'Гала', duration: '6 часов', price: '12 900 ₽', features: ['До 20 человек', 'Полный лофт', 'Живая музыка', 'Бар и фуршет', 'Фото-зона'], highlight: false },
          ].map((plan, i) => (
            <motion.div key={plan.name}
              className="rounded-2xl p-6 flex flex-col"
              style={{ backgroundColor: plan.highlight ? '#1e0b12' : '#150709', border: `1px solid ${plan.highlight ? '#c4748a' : '#2a1018'}` }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              {plan.highlight && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full self-start mb-3"
                  style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}>Популярный</span>
              )}
              <p className="text-sm mb-1" style={{ color: '#c4748a' }}>{plan.duration}</p>
              <h3 className="text-xl font-bold mb-1" style={{ color: '#f0d9de' }}>{plan.name}</h3>
              <p className="text-3xl font-bold mb-4" style={{ color: plan.highlight ? '#c4748a' : '#f0d9de' }}>{plan.price}</p>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#a08088' }}>
                    <Icon name="Check" size={14} style={{ color: '#c4748a' }} /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
                style={plan.highlight
                  ? { backgroundColor: '#7a2035', color: '#f0d9de' }
                  : { backgroundColor: 'transparent', color: '#c4748a', border: '1px solid #3a1a22' }
                }>
                Выбрать
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ГРАФИК РАБОТЫ */}
      <section id="schedule" className="px-5 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#110609' }}>
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10"
          style={{ color: '#f0d9de' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Как мы работаем?
        </motion.h2>
        <div className="max-w-2xl grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-bold mb-4" style={{ color: '#c4748a' }}>Мы работаем каждый день:</p>
            <ul className="space-y-2 text-sm" style={{ color: '#c9a8b0' }}>
              {['Пн — 14:00–02:00', 'Вт — 14:00–02:00', 'Ср — 14:00–02:00', 'Чт — 14:00–02:00', 'Пт — 14:00–06:00', 'Сб — 12:00–06:00', 'Вс — 12:00–02:00'].map(d => (
                <li key={d} className="flex items-center gap-2">
                  <span style={{ color: '#7a2035' }}>•</span> {d}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <p className="font-bold mb-4" style={{ color: '#c4748a' }}>Стоимость посещения:</p>
            <div className="space-y-4 text-sm" style={{ color: '#c9a8b0' }}>
              <p><span className="font-bold" style={{ color: '#f0d9de' }}>7 900 ₽ / час за зал</span> — базовая цена. Действует в пятницу, субботу, воскресенье и праздничные дни.</p>
              <p>С понедельника по четверг — <span className="font-bold" style={{ color: '#f0d9de' }}>скидка 30%</span>: 5 500 ₽/час за зал.</p>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="mt-6 px-6 py-3 rounded-full font-bold text-sm transition-all"
              style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}>
              Забронировать
            </button>
          </motion.div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="px-5 md:px-12 py-16 md:py-24">
        <motion.h2 className="text-3xl font-bold mb-8" style={{ color: '#f0d9de' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Контакты
        </motion.h2>
        <div className="max-w-sm space-y-5">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#c4748a' }}>Телефон</p>
            <a href="tel:+79991234567" className="text-2xl font-bold" style={{ color: '#f0d9de' }}>+7 999 123-45-67</a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#c4748a' }}>Адрес</p>
            <p style={{ color: '#c9a8b0' }}>Москва, ул. Примерная, д. 1</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#c4748a' }}>Мессенджеры</p>
            <div className="flex gap-3">
              {[
                { icon: 'Send', label: 'Telegram' },
                { icon: 'MessageCircle', label: 'WhatsApp' },
              ].map(s => (
                <button key={s.icon}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{ border: '1px solid #3a1a22', color: '#c4748a' }}>
                  <Icon name={s.icon as 'Send'} size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 md:px-12 py-8 text-center text-xs" style={{ borderTop: '1px solid #1a0a0f', color: '#5a3040' }}>
        © 2024 Лофт Эми Вайнхаус · Кино · Kараоке · Лофт
      </footer>

      {/* STICKY BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden"
        style={{ background: 'linear-gradient(to top, rgba(13,5,8,1) 60%, transparent)' }}>
        <button
          onClick={() => setBookingOpen(true)}
          className="w-full py-4 rounded-full font-bold text-base"
          style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}>
          Забронировать вечер
        </button>
      </div>
    </div>
  )
}
