'use client'
import { Product } from '@repo/common'
import React from 'react'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductRatingsProps {
  ratingScore: Product['ratingScore']
}

export function ProductRatings({ ratingScore }: ProductRatingsProps) {
  const { averageRating } = ratingScore
  const ratings = []

  for (let i = 0; i < 5; i++) {
    ratings.push(<Star key={i} filled={i < averageRating} />)
  }

  return <div className="flex items-center space-x-0.5">{ratings}</div>
}

function Star({ filled }: { filled: boolean }) {
  return (
    <StarIcon
      className={cn(
        'w-3 h-3 stroke-yellow-500',
        filled ? 'fill-yellow-500' : 'fill-white'
      )}
    />
  )
}
