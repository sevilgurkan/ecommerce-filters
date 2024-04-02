import {
  useQueryClient,
  useMutation,
  type QueryClient,
} from '@tanstack/react-query'
import { addToCart, deleteFromCart, updateCartQuantity } from '@/lib/api'

function invalidateCartQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ['cart'] })
  queryClient.invalidateQueries({ queryKey: ['cart/count'] })
}

function useCartMutation<T>(mutationFn: (body: T) => Promise<unknown>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => invalidateCartQueries(queryClient),
  })
}

export function useUpdateCart() {
  return useCartMutation(addToCart)
}

export function useDeleteCart() {
  return useCartMutation(deleteFromCart)
}

export function useUpdateQuantity() {
  return useCartMutation(updateCartQuantity)
}
