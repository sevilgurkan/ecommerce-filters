import Link from 'next/link'

export function CartActions() {
  return (
    <div className="flex items-center justify-center gap-2 mb-3 my-3">
      <Link
        href="/cart"
        className="border border-gray-200 w-[140px] h-[40px] text-sm leading-normal text-center inline-flex items-center justify-center rounded-md"
      >
        Sepete Git
      </Link>
      <Link
        href=""
        className="w-[140px] h-[40px] text-sm leading-normal text-center inline-flex items-center justify-center bg-orange-500 text-white rounded-md"
      >
        Siparişi Tamamla
      </Link>
    </div>
  )
}
