import type { ReactNode } from "react"

export interface PricingPlan {
  name: string
  duration: string
  price: string
  features: string[]
  highlight?: boolean
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  image?: string
  variant?: 'default' | 'pricing' | 'image'
  plans?: PricingPlan[]
}

export interface SectionProps extends Section {
  isActive: boolean
}
