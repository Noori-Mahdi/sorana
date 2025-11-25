'use server'
import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'
import { TModelCountry } from './CountryAction'

// ------------------- Types -------------------
export type TModelBrand = {
  id: string
  name: string
  image?: string
  countryId: string
}

export type TBrandResponse =
  | {
      type: 'success'
      message?: string
      data?: TModelBrand[] | []
    }
  | {
      type: 'error'
      errors: Record<'general' | string, string>
    }

export type TCountryResponse =
  | {
      type: 'success'
      message?: string
      data?: TModelCountry[] | []
    }
  | {
      type: 'error'
      errors: Record<'general' | string, string>
    }

// ------------------- Get Brands -------------------
export async function getBrand(): Promise<TBrandResponse> {
  try {
    const brands = await prisma.brand.findMany({
      include: { country: true },
    })

    return {
      type: 'success',
      data: brands.map((b) => ({
        id: b.id,
        name: b.name,
        image: b.image ?? undefined,
        countryId: b.countryId,
      })),
      message: 'برندها با موفقیت دریافت شدند',
    }
  } catch (error) {
    console.error('[GET_BRAND_ERROR]', error)
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}

// ------------------- Create Brand -------------------
export async function createBrand(formData: FormData): Promise<TBrandResponse> {
  const errors: Record<string, string> = {}
  const name = formData.get('name') as string
  const countryId = formData.get('countryId') as string
  const image = formData.get('image') as File | null

  if (!name) errors.name = 'وارد کردن اسم برند اجباری است'
  if (!countryId) errors.countryId = 'وارد کردن کشور برند اجباری است'

  if (Object.keys(errors).length > 0) return { type: 'error', errors }

  try {
    const exists = await prisma.brand.findFirst({ where: { name, countryId } })
    if (exists)
      return { type: 'error', errors: { name: 'این برند قبلاً ثبت شده است' } }

    // --- File Upload ---
    let imageUrl: string | undefined
    if (image) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'brand')
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true })

      const imageName = `${Date.now()}-${image.name}`
      const imagePath = path.join(uploadsDir, imageName)
      const buffer = Buffer.from(await image.arrayBuffer())
      await fs.promises.writeFile(imagePath, buffer)

      imageUrl = `/uploads/brand/${imageName}`
    }

    const brand = await prisma.brand.create({
      data: { name, countryId, image: imageUrl },
    })

    return {
      type: 'success',
      message: 'برند با موفقیت ایجاد شد',
      data: [
        {
          id: brand.id,
          name: brand.name,
          countryId: brand.countryId,
          image: brand.image ?? undefined,
        },
      ],
    }
  } catch (error) {
    console.error('Create Brand Error:', error)
    return {
      type: 'error',
      errors: { general: 'خطا در ایجاد برند. دوباره تلاش کنید.' },
    }
  }
}

// ------------------- Edit Brand -------------------
export async function editBrand(
  id: string,
  formData: FormData
): Promise<TBrandResponse> {
  const errors: Record<string, string> = {}
  const name = formData.get('name') as string
  const countryId = formData.get('countryId') as string
  const image = formData.get('image') as File | null

  if (!name) errors.name = 'وارد کردن اسم برند اجباری است'
  if (!countryId) errors.countryId = 'وارد کردن کشور برند اجباری است'

  if (Object.keys(errors).length > 0) return { type: 'error', errors }

  try {
    let imageUrl: string | undefined
    if (image) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'brand')
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true })

      const imageName = `${Date.now()}-${image.name}`
      const imagePath = path.join(uploadsDir, imageName)
      const buffer = Buffer.from(await image.arrayBuffer())
      await fs.promises.writeFile(imagePath, buffer)

      imageUrl = `/uploads/brand/${imageName}`
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: { name, countryId, ...(imageUrl ? { image: imageUrl } : {}) },
    })

    return {
      type: 'success',
      message: 'برند با موفقیت ویرایش شد',
      data: [
        {
          id: brand.id,
          name: brand.name,
          countryId: brand.countryId,
          image: brand.image ?? undefined,
        },
      ],
    }
  } catch (error) {
    console.error('Edit Brand Error:', error)
    return {
      type: 'error',
      errors: { general: 'خطا در ویرایش برند. دوباره تلاش کنید.' },
    }
  }
}

// ------------------- Delete Brand -------------------
export async function deleteBrand(id: string): Promise<TBrandResponse> {
  try {
    await prisma.brand.delete({ where: { id } })
    return { type: 'success', message: 'برند با موفقیت حذف شد' }
  } catch (error) {
    console.error('Delete Brand Error:', error)
    return {
      type: 'error',
      errors: { general: 'خطا در حذف برند. دوباره تلاش کنید.' },
    }
  }
}
