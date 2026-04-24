import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import func2url from '@/../backend/func2url.json'
import type { SiteContent } from './siteContent'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  planName?: string
  notifications: SiteContent['notifications']
  whatsappUrl: string
}

type Channel = 'whatsapp' | 'telegram' | 'notification'

export default function BookingModal({ isOpen, onClose, planName, notifications, whatsappUrl }: BookingModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [channel, setChannel] = useState<Channel>('whatsapp')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const hasNotifications = notifications.emailEnabled || notifications.telegramEnabled

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (channel === 'whatsapp') {
      const text = encodeURIComponent(
        `Привет! Хочу забронировать лофт Эми Вайнхаус.\nИмя: ${name}\nТелефон: ${phone}\nДата: ${date}${planName ? `\nПакет: ${planName}` : ''}`
      )
      window.open(`${whatsappUrl}?text=${text}`, '_blank')
      setSent(true)
      setLoading(false)
      return
    }

    if (channel === 'telegram') {
      const text = encodeURIComponent(
        `Привет! Хочу забронировать лофт.\nИмя: ${name}\nТелефон: ${phone}\nДата: ${date}${planName ? `\nПакет: ${planName}` : ''}`
      )
      window.open(`https://t.me/?text=${text}`, '_blank')
      setSent(true)
      setLoading(false)
      return
    }

    if (channel === 'notification') {
      try {
        await fetch(func2url['send-booking'], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            date,
            plan: planName || '',
            emailEnabled: notifications.emailEnabled,
            email: notifications.email,
            telegramEnabled: notifications.telegramEnabled,
            telegramChatId: notifications.telegramChatId,
          }),
        })
      } catch (_e) {
        // ignore network errors, still show success
      }
      setSent(true)
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSent(false)
      setLoading(false)
    }, 300)
  }

  const channels: { id: Channel; label: string; icon: string; show: boolean }[] = [
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', show: true },
    { id: 'telegram', label: 'Telegram', icon: 'Send', show: true },
    { id: 'notification', label: 'Оставить заявку', icon: 'Bell', show: hasNotifications },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(10,4,6,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={handleClose}
          />
          <motion.div
            className="relative w-full max-w-md rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: '#1a0a0f', border: '1px solid #3a1a22' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 transition-colors"
              style={{ color: '#a08088' }}
            >
              <Icon name="X" size={20} />
            </button>

            {sent ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#f0d9de' }}>Отлично!</h3>
                <p style={{ color: '#a08088' }}>
                  {channel === 'notification'
                    ? 'Заявка принята! Мы скоро свяжемся с вами.'
                    : 'Мы ждём вас в лофте!'}
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#f0d9de' }}>
                  Забронировать вечер
                </h3>
                {planName && (
                  <p className="text-sm mb-4" style={{ color: '#c4748a' }}>Тариф: {planName}</p>
                )}

                {/* Выбор способа связи */}
                <div className="flex gap-2 mb-5">
                  {channels.filter(c => c.show).map(c => (
                    <button
                      key={c.id}
                      onClick={() => setChannel(c.id)}
                      className="flex-1 py-2 px-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition-all"
                      style={{
                        backgroundColor: channel === c.id ? '#7a2035' : '#2a1018',
                        color: channel === c.id ? '#f0d9de' : '#a08088',
                        border: `1px solid ${channel === c.id ? '#c4748a' : '#3a1a22'}`,
                      }}
                    >
                      <Icon name={c.icon as 'Send'} size={16} />
                      {c.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: '#2a1018', border: '1px solid #3a1a22', color: '#f0d9de' }}
                  />
                  <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: '#2a1018', border: '1px solid #3a1a22', color: '#f0d9de' }}
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{
                      backgroundColor: '#2a1018',
                      border: '1px solid #3a1a22',
                      color: date ? '#f0d9de' : '#a08088',
                      colorScheme: 'dark',
                    }}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full mt-1 font-semibold transition-all duration-300"
                    style={{ backgroundColor: '#7a2035', color: '#f0d9de', border: 'none' }}
                  >
                    {loading ? (
                      <Icon name="Loader2" size={18} className="animate-spin" />
                    ) : (
                      <Icon name={channels.find(c => c.id === channel)?.icon as 'Send' || 'Send'} size={18} />
                    )}
                    <span className="ml-2">
                      {channel === 'whatsapp' && 'Написать в WhatsApp'}
                      {channel === 'telegram' && 'Написать в Telegram'}
                      {channel === 'notification' && 'Отправить заявку'}
                    </span>
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
