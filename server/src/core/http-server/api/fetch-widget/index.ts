import type { FastifyPluginAsync } from 'fastify'

import { fetchWidget } from '@/core/http-server/api/fetch-widget/get'
import type { APIOptions } from '@/core/http-server/http-server'

export { fetchWidget as getFetchWidget } from './get'
export { fetchWidget as postFetchWidget } from './post'

export const fetchWidgetPlugin: FastifyPluginAsync<APIOptions> = async (
  fastify,
  options
) => {
  // Fetch widget component tree
  await fastify.register(fetchWidget, options)
}
