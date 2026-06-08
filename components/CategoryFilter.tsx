'use client'

import { EventCategory } from '@/lib/types'

interface CategoryFilterProps {
  selectedCategories: EventCategory[]
  onCategoryChange: (category: EventCategory, selected: boolean) => void
}

const categories: { id: EventCategory; label: string; emoji: string }[] = [
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'hangout', label: 'Hangout', emoji: '🍹' },
  { id: 'other', label: 'Other', emoji: '🎉' },
]

export function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            onCategoryChange(
              category.id,
              !selectedCategories.includes(category.id)
            )
          }
          className={`
            px-4 py-2 font-bold border-3 border-black
            transition-all
            ${
              selectedCategories.includes(category.id)
                ? 'bg-blue-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white hover:bg-gray-100'
            }
          `}
        >
          <span className="mr-2">{category.emoji}</span>
          {category.label}
        </button>
      ))}
    </div>
  )
}
