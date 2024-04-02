import { Product } from '@repo/common'
import { ProductBadge } from '../ProductBadge'

export function ProductImageBadges({ badges }: { badges: Product['badges'] }) {
  if (Array.isArray(badges) && badges.length < 1) return null

  return (
    <div className="absolute left-2 top-2">
      <div className="flex flex-col space-y-1">
        {badges.map(badge => (
          <div key={badge.title}>
            <ProductBadge type={badge.type} title={badge.title} />
          </div>
        ))}
      </div>
    </div>
  )
}
