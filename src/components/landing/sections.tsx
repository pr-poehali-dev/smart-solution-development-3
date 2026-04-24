import { Badge } from "@/components/ui/badge"
import type { Section } from "@/types"

export const sections: Section[] = [
  {
    id: 'hero',
    variant: 'image',
    image: 'https://cdn.poehali.dev/projects/96100492-c7f7-4704-985c-419ed3d1e2ca/files/9f7bc28f-0105-4115-9c38-7d484a580b6c.jpg',
    subtitle: <Badge variant="outline" className="border-[#c4748a] text-[#c4748a]">Лофт · Москва</Badge>,
    title: "Эми Вайнхаус.",
    showButton: true,
    buttonText: 'Забронировать'
  },
  {
    id: 'about',
    variant: 'image',
    image: 'https://cdn.poehali.dev/projects/96100492-c7f7-4704-985c-419ed3d1e2ca/files/ff43bad7-580e-4eb8-a6e0-4ab319cd07be.jpg',
    title: 'Место, где музыка живёт.',
    content: 'Лофт Эми Вайнхаус — это пространство, созданное для тех, кто ценит атмосферу. Живой звук, большой экран и виниловая душа в каждом уголке.'
  },
  {
    id: 'features',
    variant: 'image',
    image: 'https://cdn.poehali.dev/projects/96100492-c7f7-4704-985c-419ed3d1e2ca/files/24f40c9e-f005-4545-8e01-7fd7917f51e9.jpg',
    title: 'Кино. Музыка. Вы.',
    content: 'Частный кинотеатр с профессиональным звуком, полная библиотека треков для караоке и уютный лофт на вечер — только для вашей компании.'
  },
  {
    id: 'pricing',
    variant: 'pricing',
    title: 'Выберите свой вечер',
    plans: [
      {
        name: 'Кино',
        duration: '3 часа',
        price: '4 900 ₽',
        features: ['До 8 человек', 'Проектор 4K', 'Звук Dolby', 'Пледы и пуфы']
      },
      {
        name: 'Звезда',
        duration: '4 часа',
        price: '7 900 ₽',
        features: ['До 12 человек', 'Кино + Караоке', 'Профессиональный микрофон', 'Фуршетная зона', 'Декор в подарок'],
        highlight: true
      },
      {
        name: 'Гала',
        duration: '6 часов',
        price: '12 900 ₽',
        features: ['До 20 человек', 'Полный лофт', 'Ди-джей или живая музыка', 'Бар и фуршет', 'Фото-зона']
      }
    ]
  },
  {
    id: 'join',
    title: 'Ваш вечер начинается здесь.',
    content: 'Забронируйте лофт для своей компании. Мы позаботимся о музыке, атмосфере и незабываемом настроении.',
    showButton: true,
    buttonText: 'Забронировать'
  },
]
