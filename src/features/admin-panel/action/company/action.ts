'use server'
import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'
import { TRegisterResponse } from '@/features/auth/registerPage/types/type'

export async function getCompany(): Promise<TRegisterResponse> {
  try {
    const data = await prisma.company.findMany({
      select: { id: true, name: true },
    })
    return { type: 'success', data: data, message: 'کمپانی با موفقیت اضافه شد' }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}

export async function createCompany(
  formData: FormData
): Promise<TRegisterResponse> {
  const errors: Record<string, string> = {}
  const name = formData.get('name') as string
  const file = formData.get('image') as File

  if (!name) errors.name = 'وارد کردن اسم کمپانی اجباری'
  if (!file) errors.image = 'وارد کردن عکس کمپانی اجباری'
  if (Object.keys(errors).length > 0) return { type: 'error', errors }

  try {
    const existingCompany = await prisma.company.findUnique({ where: { name } })
    if (existingCompany)
      return { type: 'error', errors: { name: 'این کمپانی قبلا ساخته شده' } }

    // ساخت مسیر ذخیره‌سازی
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true })

    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadsDir, fileName)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.promises.writeFile(filePath, buffer)

    const imageUrl = `/uploads/${fileName}`

    await prisma.company.create({ data: { name, image: imageUrl } })
    return { type: 'success', message: 'کمپانی با موفقیت اضافه شد' }
  } catch (err) {
    console.error('CreateCompany error:', err)
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}
