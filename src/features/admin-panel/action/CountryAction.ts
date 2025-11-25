'use server'
import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'

// ------------------- Types -------------------
export type TModelCountry = {
  id: string
  countryName: string
  flagImage: string
  countryImage: string
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

// ------------------- Get All Countries -------------------
export async function getCountry(): Promise<TCountryResponse> {
  try {
    const countries = await prisma.country.findMany({})

    return {
      type: 'success',
      data: countries,
      message: 'کشورها با موفقیت دریافت شدند',
    }
  } catch (error) {
    console.error('[GET_COUNTRY_ERROR]', error)
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}

// ------------------- Create Country -------------------
export async function createCountry(
  formData: FormData
): Promise<TCountryResponse> {
  const errors: Record<string, string> = {}

  const countryName = formData.get('countryName') as string
  const flagImage = formData.get('flagImage') as File
  const countryImage = formData.get('countryImage') as File

  // --- Validation ---
  if (!countryName) errors.countryName = 'وارد کردن اسم کشور اجباری است'
  if (!flagImage) errors.flagImage = 'وارد کردن عکس پرچم اجباری است'
  if (!countryImage) errors.countryImage = 'وارد کردن عکس کشور اجباری است'

  if (Object.keys(errors).length > 0) {
    return { type: 'error', errors }
  }

  try {
    // --- Check exists ---
    const exists = await prisma.country.findUnique({
      where: { countryName },
    })

    if (exists) {
      return {
        type: 'error',
        errors: { countryName: 'این کشور قبلاً ثبت شده است' },
      }
    }

    // ----------- File Upload Section -----------
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'country')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Flag Image
    const flagImageName = `${Date.now()}-${flagImage.name}`
    const flagImagePath = path.join(uploadsDir, flagImageName)

    const flagBuffer = Buffer.from(await flagImage.arrayBuffer())
    await fs.promises.writeFile(flagImagePath, flagBuffer)

    // Country Image
    const countryImageName = `${Date.now()}-${countryImage.name}`
    const countryImagePath = path.join(uploadsDir, countryImageName)

    const countryBuffer = Buffer.from(await countryImage.arrayBuffer())
    await fs.promises.writeFile(countryImagePath, countryBuffer)

    // URL to store in DB
    const flagImageUrl = `/uploads/country/${flagImageName}`
    const countryImageUrl = `/uploads/country/${countryImageName}`

    // ----------- Save in DB -----------
    await prisma.country.create({
      data: {
        countryName,
        flagImage: flagImageUrl,
        countryImage: countryImageUrl,
      },
    })

    return { type: 'success', message: 'کشور با موفقیت ایجاد شد' }
  } catch (error) {
    console.error('Create Country Error:', error)

    return {
      type: 'error',
      errors: { general: 'خطا در ایجاد کشور. دوباره تلاش کنید.' },
    }
  }
}
// ------------------- Edit Country -------------------
export async function editCountry(
  formData: FormData
): Promise<TCountryResponse> {
  const id = formData.get('id') as string
  const countryName = formData.get('countryName') as string
  const newFlagImage = formData.get('flagImage') as File | null
  const newCountryImage = formData.get('countryImage') as File | null

  try {
    const country = await prisma.country.findUnique({ where: { id } })
    if (!country) {
      return { type: 'error', errors: { general: 'کشور یافت نشد' } }
    }

    let flagImageUrl = country.flagImage
    let countryImageUrl = country.countryImage

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'country')
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true })

    // --- اگر تصویر پرچم جدید فرستاده شده ---
    if (newFlagImage && newFlagImage.size > 0) {
      const fileName = `${Date.now()}-${newFlagImage.name}`
      const filePath = path.join(uploadsDir, fileName)

      const buffer = Buffer.from(await newFlagImage.arrayBuffer())
      await fs.promises.writeFile(filePath, buffer)

      flagImageUrl = `/uploads/country/${fileName}`
    }

    // --- اگر تصویر کشور جدید فرستاده شده ---
    if (newCountryImage && newCountryImage.size > 0) {
      const fileName = `${Date.now()}-${newCountryImage.name}`
      const filePath = path.join(uploadsDir, fileName)

      const buffer = Buffer.from(await newCountryImage.arrayBuffer())
      await fs.promises.writeFile(filePath, buffer)

      countryImageUrl = `/uploads/country/${fileName}`
    }

    await prisma.country.update({
      where: { id },
      data: {
        countryName,
        flagImage: flagImageUrl,
        countryImage: countryImageUrl,
      },
    })

    return { type: 'success', message: 'کشور با موفقیت ویرایش شد' }
  } catch (error) {
    console.log(error)
    return {
      type: 'error',
      errors: { general: 'خطا در ویرایش کشور، دوباره تلاش کنید.' },
    }
  }
}

// ------------------- Delete Country -------------------
export async function deleteCountry(id: string): Promise<TCountryResponse> {
  try {
    const country = await prisma.country.findUnique({ where: { id } })

    if (!country) {
      return {
        type: 'error',
        errors: { general: 'کشور یافت نشد' },
      }
    }

    // مسیر پوشه آپلود تصاویر
    const uploadsDir = path.join(process.cwd(), 'public')

    // حذف عکس پرچم
    if (country.flagImage) {
      const flagPath = path.join(uploadsDir, country.flagImage)
      if (fs.existsSync(flagPath)) fs.unlinkSync(flagPath)
    }

    // حذف عکس جغرافیا
    if (country.countryImage) {
      const imagePath = path.join(uploadsDir, country.countryImage)
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
    }

    // حذف رکورد از دیتابیس
    await prisma.country.delete({ where: { id } })

    return { type: 'success', message: 'کشور با موفقیت حذف شد' }
  } catch (error) {
    console.log(error)
    return {
      type: 'error',
      errors: { general: 'خطا در حذف کشور' },
    }
  }
}
