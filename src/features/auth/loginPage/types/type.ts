export type TLoginResponse = {
  type: 'success' | 'error'
  errors?: Record<string, string>
  message?: string
}