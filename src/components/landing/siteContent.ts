export interface SiteContent {
  // Глобальные стили
  global: {
    bgColor: string
    accentColor: string
    textColor: string
    mutedColor: string
    buttonColor: string
    buttonTextColor: string
    fontFamily: string
  }
  // Шапка
  header: {
    badge: string
    title: string
    subtitle: string
    phone: string
    address: string
    telegramUrl: string
    whatsappUrl: string
  }
  // Герой
  hero: {
    bgImage: string
    label: string
    title: string
    buttonText: string
  }
  // О нас
  about: {
    title: string
    listTitle: string
    items: string[]
    buttonText: string
  }
  // Преимущества
  features: {
    title: string
    items: string[]
    buttonText: string
  }
  // Тарифы
  pricing: {
    title: string
    plans: {
      name: string
      duration: string
      price: string
      features: string[]
      highlight: boolean
      image?: string
    }[]
  }
  // График
  schedule: {
    title: string
    scheduleTitle: string
    hours: string[]
    priceTitle: string
    priceWeekend: string
    priceWeekday: string
    buttonText: string
  }
  // Контакты
  contacts: {
    title: string
    phone: string
    address: string
  }
}

export const defaultContent: SiteContent = {
  global: {
    bgColor: '#0d0508',
    accentColor: '#c4748a',
    textColor: '#f0d9de',
    mutedColor: '#a08088',
    buttonColor: '#7a2035',
    buttonTextColor: '#f0d9de',
    fontFamily: 'Georgia, serif',
  },
  header: {
    badge: 'Лофт',
    title: 'Эми Вайнхаус',
    subtitle: 'Кино · Караоке · Лофт',
    phone: '+7 999 123-45-67',
    address: 'Москва, ул. Примерная, д. 1',
    telegramUrl: 'https://t.me/',
    whatsappUrl: 'https://wa.me/79991234567',
  },
  hero: {
    bgImage: 'https://cdn.poehali.dev/projects/96100492-c7f7-4704-985c-419ed3d1e2ca/files/24a849a5-532f-4f82-b578-268c5481f53b.jpg',
    label: 'Лофт-пространство нового формата',
    title: 'Эми Вайнхаус — это кино, музыка и атмосфера.',
    buttonText: 'Забронировать',
  },
  about: {
    title: '«Эми Вайнхаус» — это уникальное пространство с отдельными залами, где могут отдохнуть от 2 до 20 гостей. Каждая компания найдёт занятие по душе.',
    listTitle: 'У нас можно:',
    items: [
      'Отметить день рождения',
      'Провести девичник, мальчишник',
      'Устроить романтическое свидание',
      'Посмотреть фильм из огромного каталога на большом экране',
      'Спеть в караоке с друзьями и устроить песенное соревнование',
      'Сразиться в настольные игры',
      'Подключить свою музыку и потанцевать',
      'И многое другое!',
    ],
    buttonText: 'Оставить заявку',
  },
  features: {
    title: 'Тебе у нас понравится, если ты ценишь:',
    items: [
      'Богатый выбор фильмов на самый взыскательный вкус',
      'Возможность исполнить любимую песню в кругу близких людей',
      'Атмосферу живой музыки и джазового лофта',
      'Чистоту и уют в залах',
      'Современную аудио и видео технику',
      'Большой экран с изображением Full HD и выше',
    ],
    buttonText: 'Оставить заявку',
  },
  pricing: {
    title: 'Тарифы',
    plans: [
      { name: 'Кино', duration: '3 часа', price: '4 900 ₽', features: ['До 8 человек', 'Проектор 4K', 'Звук Dolby', 'Пледы и пуфы'], highlight: false },
      { name: 'Звезда', duration: '4 часа', price: '7 900 ₽', features: ['До 12 человек', 'Кино + Кaраоке', 'Проф. микрофон', 'Фуршетная зона', 'Декор в подарок'], highlight: true },
      { name: 'Гала', duration: '6 часов', price: '12 900 ₽', features: ['До 20 человек', 'Полный лофт', 'Живая музыка', 'Бар и фуршет', 'Фото-зона'], highlight: false },
    ],
  },
  schedule: {
    title: 'Как мы работаем?',
    scheduleTitle: 'Мы работаем каждый день:',
    hours: ['Пн — 14:00–02:00', 'Вт — 14:00–02:00', 'Ср — 14:00–02:00', 'Чт — 14:00–02:00', 'Пт — 14:00–06:00', 'Сб — 12:00–06:00', 'Вс — 12:00–02:00'],
    priceTitle: 'Стоимость посещения:',
    priceWeekend: '7 900 ₽ / час за зал — базовая цена. Действует в пятницу, субботу, воскресенье и праздничные дни.',
    priceWeekday: 'С понедельника по четверг — скидка 30%: 5 500 ₽/час за зал.',
    buttonText: 'Забронировать',
  },
  contacts: {
    title: 'Контакты',
    phone: '+7 999 123-45-67',
    address: 'Москва, ул. Примерная, д. 1',
  },
}

const STORAGE_KEY = 'amywh_content'

export function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultContent, ...JSON.parse(raw) }
  } catch (_e) {
    // ignore parse errors
  }
  return defaultContent
}

export function saveContent(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY)
}