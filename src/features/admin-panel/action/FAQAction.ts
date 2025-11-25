'use server'
import prisma from '@/shared/utils/db'

export type TModelFAQ = {
  id: string
  answer: string
  questions: string
}

export type TFAQResponse =
  | {
      type: 'success'
      message?: string
      data?: TModelFAQ[] | []
    }
  | {
      type: 'error'
      errors: Record<'general' | string, string>
    }

export async function getFAQ(): Promise<TFAQResponse> {
  try {
    const data = await prisma.fAQ.findMany()
    return { type: 'success', data: data, message: 'سوالات با موفقیت اضافه شد' }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}

export async function createFAQ(
  data: Omit<TModelFAQ, 'id'>
): Promise<TFAQResponse> {
  try {
    await prisma.fAQ.create({
      data: {
        questions: data.questions,
        answer: data.answer,
      },
    })

    return { type: 'success', message: 'سوال با موفقیت ایجاد شد' }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطا در ایجاد سوال، دوباره تلاش کنید.' },
    }
  }
}

export async function editFAQ(data: TModelFAQ): Promise<TFAQResponse> {
  try {
    await prisma.fAQ.update({
      where: { id: data.id },
      data: {
        questions: data.questions,
        answer: data.answer,
      },
    })

    return { type: 'success', message: 'سوال با موفقیت ویرایش شد' }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطا در ویرایش سوال، دوباره تلاش کنید.' },
    }
  }
}

export type TDeleteFAQPayload = {
  id: string
}

export async function deleteFAQ(id: string): Promise<TFAQResponse> {
  try {
    await prisma.fAQ.delete({
      where: { id: id },
    })

    return { type: 'success', message: 'سوال با موفقیت حذف شد' }
  } catch (error) {
    return {
      type: 'error',
      errors: { general: 'خطا در حذف سوال' },
    }
  }
}
