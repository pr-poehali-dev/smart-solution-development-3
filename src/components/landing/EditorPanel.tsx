import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '@/components/ui/icon'
import type { SiteContent } from './siteContent'
import { saveContent, resetContent, defaultContent } from './siteContent'

const FONTS = [
  { label: 'Georgia (классика)', value: 'Georgia, serif' },
  { label: 'Inter (современный)', value: 'Inter, sans-serif' },
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
  { label: 'Montserrat', value: "'Montserrat', sans-serif" },
  { label: 'Roboto', value: "'Roboto', sans-serif" },
]

const TABS = [
  { id: 'global', label: 'Стиль', icon: 'Palette' },
  { id: 'header', label: 'Шапка', icon: 'LayoutTemplate' },
  { id: 'hero', label: 'Герой', icon: 'Image' },
  { id: 'about', label: 'О нас', icon: 'Info' },
  { id: 'features', label: 'Плюсы', icon: 'Star' },
  { id: 'pricing', label: 'Тарифы', icon: 'CreditCard' },
  { id: 'schedule', label: 'График', icon: 'Clock' },
  { id: 'contacts', label: 'Контакты', icon: 'Phone' },
] as const

type TabId = typeof TABS[number]['id']

interface Props {
  content: SiteContent
  onChange: (c: SiteContent) => void
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="mb-3">
      <label className="block text-xs mb-1" style={{ color: '#a08088' }}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
          style={{ backgroundColor: '#1a0a0f', border: '1px solid #3a1a22', color: '#f0d9de' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{ backgroundColor: '#1a0a0f', border: '1px solid #3a1a22', color: '#f0d9de' }}
        />
      )}
    </div>
  )
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <label className="text-xs flex-1" style={{ color: '#a08088' }}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0"
          style={{ backgroundColor: 'transparent' }}
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-24 px-2 py-1 rounded text-xs outline-none"
          style={{ backgroundColor: '#1a0a0f', border: '1px solid #3a1a22', color: '#f0d9de' }}
        />
      </div>
    </div>
  )
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      if (ev.target?.result) onChange(ev.target.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="mb-3">
      <label className="block text-xs mb-2" style={{ color: '#a08088' }}>{label}</label>
      {value && (
        <div className="w-full h-24 rounded-lg mb-2 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${value})`, border: '1px solid #3a1a22' }} />
      )}
      <div className="flex gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all"
          style={{ backgroundColor: '#2a1018', color: '#c4748a', border: '1px solid #3a1a22' }}>
          <Icon name="Upload" size={13} /> Загрузить фото
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      <Field label="или вставьте ссылку на фото" value={value} onChange={onChange} />
    </div>
  )
}

function ListField({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  const update = (i: number, v: string) => {
    const next = [...items]
    next[i] = v
    onChange(next)
  }
  const add = () => onChange([...items, ''])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))

  return (
    <div className="mb-3">
      <label className="block text-xs mb-2" style={{ color: '#a08088' }}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={e => update(i, e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
              style={{ backgroundColor: '#1a0a0f', border: '1px solid #3a1a22', color: '#f0d9de' }}
            />
            <button onClick={() => remove(i)} className="px-2" style={{ color: '#7a2035' }}>
              <Icon name="Trash2" size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={add}
        className="mt-2 text-xs flex items-center gap-1 transition-all"
        style={{ color: '#c4748a' }}>
        <Icon name="Plus" size={13} /> Добавить пункт
      </button>
    </div>
  )
}

export default function EditorPanel({ content, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<TabId>('global')
  const [saved, setSaved] = useState(false)

  const set = <K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) => {
    onChange({ ...content, [section]: { ...(content[section] as object), ...patch } })
  }

  const handleSave = () => {
    saveContent(content)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (confirm('Сбросить все изменения к исходным настройкам?')) {
      resetContent()
      onChange(defaultContent)
    }
  }

  return (
    <>
      {/* Кнопка открытия редактора */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all md:bottom-6"
        style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}
        title="Редактировать сайт">
        <Icon name="Pencil" size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-full max-w-sm"
              style={{ backgroundColor: '#0d0508', borderLeft: '1px solid #2a1018' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Заголовок панели */}
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #1a0a0f' }}>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#f0d9de' }}>Редактор сайта</p>
                  <p className="text-xs" style={{ color: '#a08088' }}>Изменения сохраняются на вашем устройстве</p>
                </div>
                <button onClick={() => setOpen(false)} style={{ color: '#a08088' }}>
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Табы секций */}
              <div className="flex overflow-x-auto gap-1 px-3 py-2" style={{ borderBottom: '1px solid #1a0a0f' }}>
                {TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs transition-all"
                    style={tab === t.id
                      ? { backgroundColor: '#7a2035', color: '#f0d9de' }
                      : { color: '#a08088' }
                    }>
                    <Icon name={t.icon as 'Palette'} size={15} />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Содержимое таба */}
              <div className="flex-1 overflow-y-auto px-4 py-4">

                {tab === 'global' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>Цвета и шрифт</p>
                    <ColorField label="Фон страницы" value={content.global.bgColor} onChange={v => set('global', { bgColor: v })} />
                    <ColorField label="Акцентный цвет" value={content.global.accentColor} onChange={v => set('global', { accentColor: v })} />
                    <ColorField label="Цвет заголовков" value={content.global.textColor} onChange={v => set('global', { textColor: v })} />
                    <ColorField label="Цвет текста" value={content.global.mutedColor} onChange={v => set('global', { mutedColor: v })} />
                    <ColorField label="Цвет кнопок" value={content.global.buttonColor} onChange={v => set('global', { buttonColor: v })} />
                    <ColorField label="Текст кнопок" value={content.global.buttonTextColor} onChange={v => set('global', { buttonTextColor: v })} />
                    <div className="mb-3 mt-4">
                      <label className="block text-xs mb-2" style={{ color: '#a08088' }}>Шрифт</label>
                      <div className="space-y-2">
                        {FONTS.map(f => (
                          <button
                            key={f.value}
                            onClick={() => set('global', { fontFamily: f.value })}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                            style={{
                              fontFamily: f.value,
                              backgroundColor: content.global.fontFamily === f.value ? '#2a1018' : 'transparent',
                              border: `1px solid ${content.global.fontFamily === f.value ? '#c4748a' : '#2a1018'}`,
                              color: content.global.fontFamily === f.value ? '#f0d9de' : '#a08088',
                            }}>
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'header' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>Шапка сайта</p>
                    <Field label="Бейдж (над названием)" value={content.header.badge} onChange={v => set('header', { badge: v })} />
                    <Field label="Название заведения" value={content.header.title} onChange={v => set('header', { title: v })} />
                    <Field label="Подзаголовок" value={content.header.subtitle} onChange={v => set('header', { subtitle: v })} />
                    <Field label="Телефон" value={content.header.phone} onChange={v => set('header', { phone: v })} />
                    <Field label="Адрес" value={content.header.address} onChange={v => set('header', { address: v })} />
                    <Field label="Ссылка Telegram" value={content.header.telegramUrl} onChange={v => set('header', { telegramUrl: v })} />
                    <Field label="Ссылка WhatsApp" value={content.header.whatsappUrl} onChange={v => set('header', { whatsappUrl: v })} />
                  </div>
                )}

                {tab === 'hero' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>Главный экран</p>
                    <ImageField label="Фоновое изображение" value={content.hero.bgImage} onChange={v => set('hero', { bgImage: v })} />
                    <Field label="Подпись (маленький текст)" value={content.hero.label} onChange={v => set('hero', { label: v })} />
                    <Field label="Главный заголовок" value={content.hero.title} onChange={v => set('hero', { title: v })} multiline />
                    <Field label="Текст кнопки" value={content.hero.buttonText} onChange={v => set('hero', { buttonText: v })} />
                  </div>
                )}

                {tab === 'about' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>Блок «О нас»</p>
                    <Field label="Заголовок блока" value={content.about.title} onChange={v => set('about', { title: v })} multiline />
                    <Field label="Заголовок списка" value={content.about.listTitle} onChange={v => set('about', { listTitle: v })} />
                    <ListField label="Пункты списка" items={content.about.items} onChange={v => set('about', { items: v })} />
                    <Field label="Текст кнопки" value={content.about.buttonText} onChange={v => set('about', { buttonText: v })} />
                  </div>
                )}

                {tab === 'features' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>Блок преимуществ</p>
                    <Field label="Заголовок блока" value={content.features.title} onChange={v => set('features', { title: v })} multiline />
                    <ListField label="Преимущества" items={content.features.items} onChange={v => set('features', { items: v })} />
                    <Field label="Текст кнопки" value={content.features.buttonText} onChange={v => set('features', { buttonText: v })} />
                  </div>
                )}

                {tab === 'pricing' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>Тарифы</p>
                    <Field label="Заголовок раздела" value={content.pricing.title} onChange={v => set('pricing', { title: v })} />
                    {content.pricing.plans.map((plan, i) => (
                      <div key={i} className="mb-4 p-3 rounded-xl" style={{ border: '1px solid #2a1018', backgroundColor: '#110609' }}>
                        <p className="text-xs font-bold mb-3" style={{ color: '#c4748a' }}>Тариф {i + 1}</p>
                        <Field label="Название" value={plan.name} onChange={v => {
                          const plans = [...content.pricing.plans]
                          plans[i] = { ...plans[i], name: v }
                          set('pricing', { plans })
                        }} />
                        <Field label="Длительность" value={plan.duration} onChange={v => {
                          const plans = [...content.pricing.plans]
                          plans[i] = { ...plans[i], duration: v }
                          set('pricing', { plans })
                        }} />
                        <Field label="Цена" value={plan.price} onChange={v => {
                          const plans = [...content.pricing.plans]
                          plans[i] = { ...plans[i], price: v }
                          set('pricing', { plans })
                        }} />
                        <ListField label="Включено" items={plan.features} onChange={v => {
                          const plans = [...content.pricing.plans]
                          plans[i] = { ...plans[i], features: v }
                          set('pricing', { plans })
                        }} />
                        <ImageField label="Фото тарифа (необязательно)" value={plan.image || ''} onChange={v => {
                          const plans = [...content.pricing.plans]
                          plans[i] = { ...plans[i], image: v }
                          set('pricing', { plans })
                        }} />
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'schedule' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>График работы</p>
                    <Field label="Заголовок раздела" value={content.schedule.title} onChange={v => set('schedule', { title: v })} />
                    <ListField label="Часы работы" items={content.schedule.hours} onChange={v => set('schedule', { hours: v })} />
                    <Field label="Заголовок цен" value={content.schedule.priceTitle} onChange={v => set('schedule', { priceTitle: v })} />
                    <Field label="Цена (выходные)" value={content.schedule.priceWeekend} onChange={v => set('schedule', { priceWeekend: v })} multiline />
                    <Field label="Цена (будни)" value={content.schedule.priceWeekday} onChange={v => set('schedule', { priceWeekday: v })} multiline />
                    <Field label="Текст кнопки" value={content.schedule.buttonText} onChange={v => set('schedule', { buttonText: v })} />
                  </div>
                )}

                {tab === 'contacts' && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c4748a' }}>Контакты</p>
                    <Field label="Заголовок раздела" value={content.contacts.title} onChange={v => set('contacts', { title: v })} />
                    <Field label="Телефон" value={content.contacts.phone} onChange={v => set('contacts', { phone: v })} />
                    <Field label="Адрес" value={content.contacts.address} onChange={v => set('contacts', { address: v })} />
                  </div>
                )}

              </div>

              {/* Кнопки сохранения */}
              <div className="px-4 py-3 flex gap-2" style={{ borderTop: '1px solid #1a0a0f' }}>
                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-lg text-xs transition-all"
                  style={{ color: '#a08088', border: '1px solid #2a1018' }}>
                  Сбросить
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: saved ? '#2d6a3f' : '#7a2035', color: '#f0d9de' }}>
                  {saved ? <><Icon name="Check" size={16} /> Сохранено!</> : <><Icon name="Save" size={16} /> Сохранить</>}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}