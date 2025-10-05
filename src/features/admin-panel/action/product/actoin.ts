'use server'

import { TRegisterResponse } from '@/features/auth/registerPage/types/type'
import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'

export type TResponse<T> =
  | { type: 'success'; data: T }
  | { type: 'error'; errors: Record<string, string> }

export type TProduct = {
  length: string | null
  name: string
  id: string
  image: string
  type: 'frontRotor' | 'frontBrake' | 'rearRotor' | 'rearBrake' | 'parkingShoe'
  width: string | null
  mainTechnicalCode: string | null
  FMSITechnicalCode: string | null
  HIQTechnicalCode: string | null
  WVATechnicalCode: string | null
}

export async function getProduct(): Promise<TResponse<TProduct[]>> {
  try {
    const data = await prisma.product.findMany()

    const formatted: TProduct[] = data.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      type: p.type,
      length: p.length,
      width: p.width,
      mainTechnicalCode: p.mainTechnicalCode,
      FMSITechnicalCode: p.FMSITechnicalCode,
      HIQTechnicalCode: p.HIQTechnicalCode,
      WVATechnicalCode: p.WVATechnicalCode,
    }))

    return { type: 'success', data: formatted }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}

export async function createProduct(
  formData: FormData
): Promise<TRegisterResponse> {
  const errors: Record<string, string> = {}

  const name = formData.get('name') as string
  const length = formData.get('length') as string | null
  const width = formData.get('width') as string | null
  const type = formData.get('type') as TProduct['type']
  const mainTechnicalCode = formData.get('mainTechnicalCode') as string | null
  const FMSITechnicalCode = formData.get('FMSITechnicalCode') as string | null
  const HIQTechnicalCode = formData.get('HIQTechnicalCode') as string | null
  const WVATechnicalCode = formData.get('WVATechnicalCode') as string | null
  const file = formData.get('image') as File

  // بررسی فیلدهای ضروری
  if (!name) errors.name = 'انتخاب اسم کالا اجباری است'
  if (!type) errors.type = 'وارد کردن نوع کالا اجباری است'
  if (!file) errors.image = 'آپلود تصویر اجباری است'
  if (Object.keys(errors).length > 0) return { type: 'error', errors }

  try {
    // بررسی تکراری بودن نام
    const existingProduct = await prisma.product.findUnique({ where: { name } })
    if (existingProduct)
      return { type: 'error', errors: { name: 'این کالا قبلا اضافه شده' } }

    // ذخیره فایل
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true })

    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadsDir, fileName)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.promises.writeFile(filePath, buffer)
    const imageUrl = `/uploads/${fileName}` // همیشه رشته است، null نیست

    // ایجاد محصول
    await prisma.product.create({
      data: {
        name,
        type,
        length,
        width,
        mainTechnicalCode,
        FMSITechnicalCode,
        HIQTechnicalCode,
        WVATechnicalCode,
        image: imageUrl, // حالا همیشه رشته است
      },
    })

    return { type: 'success', message: 'کالا با موفقیت اضافه شد' }
  } catch (err) {
    console.error('CreateProduct error:', err)
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}
