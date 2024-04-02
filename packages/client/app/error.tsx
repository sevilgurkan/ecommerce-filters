'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col justify-center items-center">
      <div className="space-y-4">
        <h2 className="text-3xl">Bir şeyler yanlış gitti!</h2>
        <div className="flex-1 flex justify-evenly">
          <button className="text-blue-500" onClick={() => reset()}>
            Try again
          </button>
          <button
            className="bg-brand text-white px-2 py-0.5 rounded-sm cursor-pointer"
            onClick={() => redirect('/')}
          >
            Go Homepage
          </button>
        </div>
      </div>
    </div>
  )
}
