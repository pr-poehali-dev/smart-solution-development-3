import { useState } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"
import BookingModal from "./BookingModal"

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, image, variant, plans }: SectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>()

  const openBooking = (planName?: string) => {
    setSelectedPlan(planName)
    setModalOpen(true)
  }

  if (variant === 'pricing' && plans) {
    return (
      <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
        <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} planName={selectedPlan} />
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-10 md:mb-14"
          style={{ color: '#f0d9de' }}
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="rounded-2xl p-6 flex flex-col relative cursor-pointer group transition-all duration-300"
              style={{
                backgroundColor: plan.highlight ? '#2a0f18' : '#150a0d',
                border: plan.highlight ? '1px solid #c4748a' : '1px solid #2a1018',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: '#7a2035', color: '#f0d9de' }}
                >
                  Популярный
                </div>
              )}
              <div className="mb-4">
                <p className="text-sm font-medium mb-1" style={{ color: '#c4748a' }}>{plan.duration}</p>
                <h3 className="text-xl font-bold" style={{ color: '#f0d9de' }}>{plan.name}</h3>
                <p className="text-3xl font-bold mt-2" style={{ color: plan.highlight ? '#c4748a' : '#f0d9de' }}>{plan.price}</p>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#a08088' }}>
                    <Icon name="Check" size={14} style={{ color: '#c4748a', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="w-full transition-all duration-300"
                style={plan.highlight
                  ? { backgroundColor: '#7a2035', color: '#f0d9de', border: 'none' }
                  : { backgroundColor: 'transparent', color: '#c4748a', borderColor: '#3a1a22' }
                }
                onClick={() => openBooking(plan.name)}
              >
                Выбрать
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} planName={selectedPlan} />

      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(10,4,6,0.88) 0%, rgba(26,10,15,0.6) 100%)' }}
          />
        </>
      )}

      <div className="relative z-10">
        {subtitle && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {subtitle}
          </motion.div>
        )}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl"
          style={{ color: '#f0d9de' }}
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        {content && (
          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6"
            style={{ color: '#a08088' }}
            initial={{ opacity: 0, y: 50 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content}
          </motion.p>
        )}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 md:mt-16"
          >
            <Button
              variant="outline"
              size="lg"
              className="text-[#c4748a] bg-transparent border-[#c4748a] hover:bg-[#7a2035] hover:text-[#f0d9de] hover:border-[#7a2035] transition-all duration-300"
              onClick={() => openBooking()}
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
