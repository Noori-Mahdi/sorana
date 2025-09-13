export type TRegisterResponse = {
  type: 'success' | 'error'
  errors?: Record<string, string>
  message?: string
}
