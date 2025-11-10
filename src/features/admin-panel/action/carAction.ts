'use server'

import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'
import { TCarWithCompany, TCompanyResponse } from '../types/actionType'
import { TRegisterResponse } from '@/features/auth/types/type'

export type TModleCarAndCompany = {
  id: string
  image: string
  imageCar: string | null
  carInfo: {
    series: string
    company: string
    fromYear: Date | null
    toYear: Date | null
    body: string | null
  }
}

export type testComapny = { id: string; series: string }

export type TGetProductResponse =
  | { type: 'success'; data: TModleCarAndCompany[] }
  | { type: 'success'; data: testComapny[] }
  | { type: 'error'; errors: { general: string } }

export async function getCar(companyId?: string): Promise<TGetProductResponse> {
  try {
    const whereCondition = companyId ? { companyId } : {}

    const cars = await prisma.car.findMany({
      where: whereCondition,
      take: 10,
      include: {
        company: { select: { name: true, image: true } },
      },
    })

    let formattedCars: TModleCarAndCompany[] | { id: string; series: string }[]

    if (companyId) {
      // برگشت آرایه ساده {id, series}[]
      formattedCars = cars.map((car) => ({
        id: car.id,
        series: car.series,
      }))

      return { type: 'success', data: formattedCars } as {
        type: 'success'
        data: { id: string; series: string }[]
      }
    } else {
      // برگشت آرایه TModleCarAndCompany[]
      formattedCars = cars.map((car) => ({
        id: car.id,
        image: car.company?.image ?? '',
        imageCar: car.imageCar ?? '',
        carInfo: {
          company: car.company?.name ?? '',
          series: car.series,
          fromYear: car.fromYear,
          toYear: car.toYear,
          body: car.body,
        },
      }))

      return { type: 'success', data: formattedCars } as {
        type: 'success'
        data: TModleCarAndCompany[]
      }
    }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در دریافت ماشین‌ها' } }
  }
}

export async function getCompany(page: number = 1): Promise<TCompanyResponse> {
  const pageSize = 10

  try {
    const items = await prisma.company.findMany({
      select: { id: true, name: true, image: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: 'desc' },
    })

    return {
      type: 'success',
      data: items,
      message: 'کمپانی ها با موفقیت دریافت شدن',
    }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: ['خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.'] },
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
      return {
        type: 'error',
        errors: { general: [''] },
        // errors: { series: ['این مدل قبلا اضافه شده'] }
      }

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
      errors: { general: ['خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.'] },
    }
  }
}
