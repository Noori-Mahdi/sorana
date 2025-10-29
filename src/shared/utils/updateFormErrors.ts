export function updateFormErrors<
  T extends Record<string, { error?: string[] | null }>
>(
  prev: T,
  errors: Record<string, string[]>
): T {
  const updated = { ...prev }

  Object.entries(errors).forEach(([key, value]) => {
    if (key in updated) {
      updated[key as keyof T] = {
        ...updated[key as keyof T],
        error: [(value as string[])[0]],
      }
    }
  })

  return updated
}
