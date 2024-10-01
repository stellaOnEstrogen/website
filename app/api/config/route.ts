import { config } from '@/config'
import { JsonResponse } from '@/lib/api'

export async function GET() {
	return JsonResponse({ data: config })
}
