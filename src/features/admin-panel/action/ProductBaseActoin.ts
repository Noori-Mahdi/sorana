'use server'

import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'

export type TGetProductBaseResponse =
  | {
      type: 'success'
      message?: string
      data?: TModelProductBase[]
    }
  | {
      type: 'error'
      errors: { general: string }
    }

type TDicsType =
  | 'Solid'
  | 'Vented'
  | 'Drilled'
  | 'Slotted'
  | 'Floating'
  | 'Carbon'

export type TModelProductBase = {
  id: string
  name: string
  image?: string
  ProductBaseType:
    | 'frontRotor'
    | 'frontBrake'
    | 'rearRotor'
    | 'rearBrake'
    | 'parkingShoe'

  productBaseInfo: {
    DicsType: TDicsType | null
    DiscThicknessMax: number | null
    DiscThicknessMin: number | null
    NumOfHoles: number | null
    CenteringDiameter: number | null
    PitchCircle: number | null
    Outter: number | null
    Drum: number | null
    Height: number | null
    StructureMaterial: string | null

    length: number | null
    width: number | null
    Thickness: number | null
    PcsInSet: number | null
    BrakeSystem: string | null
    Radius: number | null
  }

  cars: {
    mainTechnicalCode: string[]
    FMSITechnicalCode: string[]
    HIQTechnicalCode: string[]
    WVATechnicalCode: string[]
  }
}

export async function getProductBase(): Promise<TGetProductBaseResponse> {
  try {
    const data = await prisma.productBase.findMany()
    
    const formatted: TModelProductBase[] = data.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image ?? undefined,

      ProductBaseType: p.ProductBaseType,
      productBaseInfo: {
        DicsType: p.DicsType,
        DiscThicknessMax: p.DiscThicknessMax,
        DiscThicknessMin: p.DiscThicknessMin,
        NumOfHoles: p.NumOfHoles,
        CenteringDiameter: p.CenteringDiameter,
        PitchCircle: p.PitchCircle,
        Outter: p.Outter,
        Drum: p.Drum,
        Height: p.Height,
        StructureMaterial: p.StructureMaterial,
        length: p.length,
        width: p.width,
        Thickness: p.Thickness,
        PcsInSet: p.PcsInSet,
        BrakeSystem: p.BrakeSystem,
        Radius: p.Radius,
      },

      cars: {
        mainTechnicalCode: p.mainTechnicalCode,
        FMSITechnicalCode: p.FMSITechnicalCode,
        HIQTechnicalCode: p.HIQTechnicalCode,
        WVATechnicalCode: p.WVATechnicalCode,
      },
    }))

    return { type: 'success', data: formatted }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در دریافت محصولات پایه' } }
  }
}


// export async function createProduct(
//   formData: FormData
// ): Promise<TRegisterResponse> {
//   const errors: Record<string, string> = {}

//   const name = formData.get('name') as string
//   const length = formData.get('length') as string | null
//   const width = formData.get('width') as string | null
//   const type = formData.get('type') as TModelProduct['ProductType']
//   const mainTechnicalCode = formData.get('mainTechnicalCode') as string | null
//   const FMSITechnicalCode = formData.get('FMSITechnicalCode') as string | null
//   const HIQTechnicalCode = formData.get('HIQTechnicalCode') as string | null
//   const WVATechnicalCode = formData.get('WVATechnicalCode') as string | null
//   const file = formData.get('image') as File

//   // بررسی فیلدهای ضروری
//   if (!name) errors.name = 'انتخاب اسم کالا اجباری است'
//   if (!type) errors.type = 'وارد کردن نوع کالا اجباری است'
//   if (!file) errors.image = 'آپلود تصویر اجباری است'
//   if (Object.keys(errors).length > 0) return { type: 'error', errors }

//   try {
//     // بررسی تکراری بودن نام
//     const existingProduct = await prisma.product.findUnique({ where: { name } })
//     if (existingProduct)
//       return { type: 'error', errors: { name: 'این کالا قبلا اضافه شده' } }

//     // ذخیره فایل
//     const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
//     if (!fs.existsSync(uploadsDir))
//       fs.mkdirSync(uploadsDir, { recursive: true })

//     const fileName = `${Date.now()}-${file.name}`
//     const filePath = path.join(uploadsDir, fileName)
//     const arrayBuffer = await file.arrayBuffer()
//     const buffer = Buffer.from(arrayBuffer)
//     await fs.promises.writeFile(filePath, buffer)
//     const imageUrl = `/uploads/${fileName}` // همیشه رشته است، null نیست

//     // ایجاد محصول
//     await prisma.product.create({
//       data: {
//         name,
//         type,
//         length,
//         width,
//         mainTechnicalCode,
//         FMSITechnicalCode,
//         HIQTechnicalCode,
//         WVATechnicalCode,
//         image: imageUrl, // حالا همیشه رشته است
//       },
//     })

//     return { type: 'success', message: 'کالا با موفقیت اضافه شد' }
//   } catch (err) {
//     console.error('CreateProduct error:', err)
//     return {
//       type: 'error',
//       errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
//     }
//   }
// }
