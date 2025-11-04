export type TResponse<T> =
  | { type: 'success'; data: T }
  | { type: 'error'; errors: Record<string, string> }

export type TCar = {
  id: string
  series: string
  fromYear: Date | null
  toYear: Date | null
  body: string | null
  imageCar: string | null
}

export type TCarWithCompany = TCar & {
  companyName: string
  image: string
}

export type CompanyInfo = { name: string; id: string; image: string }

export type TCompany = {
  id: string
  name: string
  image?: string 
}
export type TCompanyResponse =
  | {
      type: 'success'
      data: TCompany[]
      message: string
    }
  | {
      type: 'error'
      errors: { general: string[] }
    }
