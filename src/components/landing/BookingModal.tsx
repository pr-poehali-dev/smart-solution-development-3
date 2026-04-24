import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  planName?: string
}

export default function BookingModal({ isOpen, onClose, planName }: BookingModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Привет! Хочу забронировать лофт Эми Вайнхаус.\nИмя: ${name}\nТелефон: ${phone}\nДата: ${date}${planName ? `\nПакет: ${planName}` : ''}`
    )
    window.open(`https://wa.me/79991234567?text=${text}`, '_blank')
    setSent(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setSent(false), 300)
  }

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
            className="relative w-full max-w-md rounded-2xl p-8"
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
                <p style={{ color: '#a08088' }}>Мы переводим вас в WhatsApp. Ждём вас в лофте!</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#f0d9de' }}>
                  Забронировать вечер
                </h3>
                {planName && (
                  <p className="text-sm mb-6" style={{ color: '#c4748a' }}>Пакет: {planName}</p>
                )}
                {!planName && (
                  <p className="text-sm mb-6" style={{ color: '#a08088' }}>
                    Оставьте контакт — мы напишем в WhatsApp и подберём удобное время
                  </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        backgroundColor: '#2a1018',
                        border: '1px solid #3a1a22',
                        color: '#f0d9de',
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Номер телефона"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        backgroundColor: '#2a1018',
                        border: '1px solid #3a1a22',
                        color: '#f0d9de',
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        backgroundColor: '#2a1018',
                        border: '1px solid #3a1a22',
                        color: date ? '#f0d9de' : '#a08088',
                        colorScheme: 'dark',
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-2 font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: '#7a2035',
                      color: '#f0d9de',
                      border: 'none',
                    }}
                  >
                    <Icon name="MessageCircle" size={18} />
                    <span className="ml-2">Написать в WhatsApp</span>
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
