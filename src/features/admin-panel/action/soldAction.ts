import prisma from '@/shared/utils/db'
import { TUser } from './userAction'

export type TGetSoldResponse =
  | {
      type: 'success'
      message?: string
      data?: TModelSold[]
    }
  | {
      type: 'error'
      errors: { general: string }
    }

export type TModelSold = {
  id: string
  createdAt: Date
  user: Pick<
    TUser,
    | 'id'
    | 'userName'
    | 'userPhone'
    | 'companyName'
    | 'companyphone'
    | 'image'
    | 'addrace'
    | 'email'
  >
  products: TSoldProduct[]
}

export type TSoldProduct = {
  id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    image: string
  }
}

export async function getSold(id?: string): Promise<TGetSoldResponse> {
  try {
    let soldResult

    if (id) {
      const sold = await prisma.sold.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              image: true,
              email: true,
              addrace: true,
              userName: true,
              userPhone: true,
              companyName: true,
              companyphone: true,
            },
          },
          products: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      })

      soldResult = sold ? [sold] : []
    } else {
      soldResult = await prisma.sold.findMany({
        take: 10,
        include: {
          user: {
            select: {
              id: true,
              image: true,
              email: true,
              addrace: true,
              userName: true,
              userPhone: true,
              companyName: true,
              companyphone: true,
            },
          },
          products: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      })
    }

    return { type: 'success', data: soldResult }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}
