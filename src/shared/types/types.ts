export type TFakeEvent = { target: { name: string; value: string } }
export type TFakeEventArray = { target: { name: string; value: string[] } }
export type TFakeEventFile = { target: { name: string; value: File | '' } }
export type TFakeEventNumber = { target: { name: string; value: number } }

export type TFormInputState = {
  value: string | null
  error?: string[]
}

export type TModeForm = 'create' | 'edit' | 'view' | 'delete'
