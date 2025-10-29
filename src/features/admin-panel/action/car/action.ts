'use server'

import { TRegisterResponse } from '@/features/auth/registerPage/types/type'
import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'

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

export async function getCar(
  id?: string
): Promise<TResponse<TCarWithCompany[]>> {
  try {
    let cars

    if (id) {
      // گرفتن فقط یک ماشین با id مشخص
      const car = await prisma.car.findUnique({
        where: { id },
        include: {
          company: { select: { name: true, image: true } },
        },
      })

      cars = car ? [car] : [] // اگر پیدا نشد آرایه خالی برگرده
    } else {
      // گرفتن 10 ماشین اول
      cars = await prisma.car.findMany({
        take: 10,
        include: {
          company: { select: { name: true, image: true } },
        },
      })
    }

    const formattedCars: TCarWithCompany[] = cars.map((car) => ({
      id: car.id,
      series: car.series,
      fromYear: car.fromYear,
      toYear: car.toYear,
      body: car.body,
      imageCar: car.imageCar,
      companyName: car.company.name,
      image: car.company.image,
    }))

    return { type: 'success', data: formattedCars }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در دریافت ماشین‌ها' } }
  }
}

export async function getCompany(): Promise<TRegisterResponse> {
  try {
    const data = await prisma.company.findMany({
      select: { id: true, name: true, image: true },
    })
    return { type: 'success', data: data, message: 'کمپانی با موفقیت اضافه شد' }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}

export async function createCar(
  formData: FormData
): Promise<TRegisterResponse> {
  const errors: Record<string, string> = {}

  const companyId = formData.get('companyId') as string
  const series = formData.get('series') as string
  const body = formData.get('body') as string | null
  const frontRotor = formData.get('frontRotor') as string | null
  const frontBrake = formData.get('frontBrake') as string | null
  const rearRotor = formData.get('rearRotor') as string | null
  const rearBrake = formData.get('rearBrake') as string | null
  const parkingShoe = formData.get('parkingShoe') as string | null
  const file = formData.get('image') as File | null

  if (!companyId) errors.companyId = 'انتخاب کمپانی اجباری است'
  if (!series) errors.series = 'وارد کردن نام مدل اجباری است'
  if (Object.keys(errors).length > 0) return { type: 'error', errors }

  try {
    const existingCar = await prisma.car.findUnique({ where: { series } })
    if (existingCar)
      return { type: 'error', errors: { series: 'این مدل قبلا اضافه شده' } }

    let imageUrl: string | null = null
    if (file) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'car')
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true })

      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadsDir, fileName)
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await fs.promises.writeFile(filePath, buffer)

      imageUrl = `/uploads/car/${fileName}`
    }

    await prisma.car.create({
      data: {
        series: series,
        body: body,
        companyId: companyId,
        imageCar: imageUrl,
        brakes: {
          connect: [
            ...(frontRotor ? [{ id: frontRotor }] : []),
            ...(frontBrake ? [{ id: frontBrake }] : []),
            ...(rearRotor ? [{ id: rearRotor }] : []),
            ...(rearBrake ? [{ id: rearBrake }] : []),
            ...(parkingShoe ? [{ id: parkingShoe }] : []),
          ],
        },
      },
    })

    return { type: 'success', message: 'ماشین با موفقیت اضافه شد' }
  } catch (err) {
    console.error('CreateCar error:', err)
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}
