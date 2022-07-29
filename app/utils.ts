import { z } from 'zod'
import type { ZodError } from 'zod'

export function date(date: Date): string {
  const config = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }
  //@ts-ignore
  return new Intl.DateTimeFormat('en', config).format(date)
}

export const Validator = z.object({
  title: z.string().min(6),
  content: z.string().min(6),
  slug: z.string().min(6)
})

export const extractValidationErrors = (error: ZodError) => {
  return error.issues.reduce(function (acc, issue) {
    //@ts-ignore
    acc[issue.path[0]] = issue.message
    return acc
  }, {})
}
