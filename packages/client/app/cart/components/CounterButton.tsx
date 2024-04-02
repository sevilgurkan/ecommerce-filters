import { cn } from '@/lib/utils'

interface CounterButtonProps {
  symbol: string
  onClick: () => void
  className?: string
  disabled?: boolean
}

export function CounterButton({
  symbol,
  className,
  disabled,
  onClick,
}: CounterButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'border border-gray-300 w-6 h-8 flex items-center justify-center hover:bg-gray-200',
        className,
        {
          'text-gray-200 pointer-events-none': disabled,
          'text-brand': !disabled,
        }
      )}
      onClick={onClick}
    >
      {symbol}
    </button>
  )
}
