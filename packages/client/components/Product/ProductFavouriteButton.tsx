import { HeartIcon } from 'lucide-react'

interface ProductFavouriteButtonProps {
  onClick?(): void
}

export function ProductFavouriteButton({
  onClick,
}: ProductFavouriteButtonProps) {
  return (
    <button className="group" onClick={onClick}>
      <div className="absolute right-2 top-2 p-2 bg-white shadow-md rounded-full">
        <HeartIcon className="w-5 h-5 text-black group-hover:text-blue-500" />
      </div>
    </button>
  )
}
