import { createFetch } from 'ofetch'
import { toast } from 'vue-sonner'

export const http = createFetch({
  defaults: {
    onRequestError(ctx) {
      console.error('[Request Error]:', ctx)
      toast.error(`Request error: ${ctx.error.message || 'Unknown error'}`)
    },
    onResponseError(ctx) {
      console.error('[Response Error]:', ctx)
      toast.error(`Request error: ${ctx.error?.message || 'Unknown error'}`)
    }
  }
})