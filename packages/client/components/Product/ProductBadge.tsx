import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { ProductBadgeTypes, ProductBadgeKeys } from '@repo/common'
import { BoxIcon, TruckIcon, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const productBadgeVariants = cva(
  'flex items-center justify-center h-6 w-[70px] text-xs rounded-md',
  {
    variants: {
      type: {
        FREE_CARGO: 'bg-gray-500 text-white',
        RUSH_DELIVERY: 'bg-green-500 text-white',
      },
    },
  }
)

type ProductBadgeVariants = VariantProps<typeof productBadgeVariants>

interface ProductBadgeProps extends ProductBadgeVariants {
  title: string
}

const iconMap: Record<ProductBadgeKeys, LucideIcon> = {
  FREE_CARGO: BoxIcon,
  RUSH_DELIVERY: TruckIcon,
}

export function ProductBadge({ type, title }: ProductBadgeProps) {
  if (!(type && type in ProductBadgeTypes)) {
    return null
  }

  const Icon = iconMap[type]
  return (
    <div className={cn(productBadgeVariants({ type }))}>
      <Icon className="w-4 h-4" />
      <div className="ml-1 text-[10px] leading-[10px] w-10 font-medium">
        {title}
      </div>
    </div>
  )
}
