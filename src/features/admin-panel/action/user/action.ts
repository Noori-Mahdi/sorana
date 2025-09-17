'use server'

import prisma from '@/shared/utils/db'

export type TUser = {
  id: string
  userPhone: string
  userName: string | null
}

export type TResponse<T> =
  | { type: 'success'; data: T }
  | { type: 'error'; errors: Record<string, string> }

// گرفتن همه کاربران
export async function getUsers(): Promise<TResponse<TUser[]>> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userPhone: true,
        userName: true,
      },
    })
    return { type: 'success', data: users }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در دریافت کاربران' } }
  }
}

// گرفتن یک کاربر با id
export async function getUserById(id: string): Promise<TResponse<TUser>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, userPhone: true, userName: true },
    })
    if (!user) return { type: 'error', errors: { general: 'کاربر پیدا نشد' } }
    return { type: 'success', data: user }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در دریافت کاربر' } }
  }
}

// حذف کاربر
export async function deleteUser(id: string): Promise<TResponse<null>> {
  try {
    await prisma.user.delete({ where: { id } })
    return { type: 'success', data: null }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در حذف کاربر' } }
  }
}

// ویرایش کاربر
export async function updateUser(
  id: string,
  data: Partial<{ name: string; phone: string }>
): Promise<TResponse<TUser>> {
  try {
    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, userPhone: true, userName: true },
    })
    return { type: 'success', data: updated }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در ویرایش کاربر' } }
  }
}

