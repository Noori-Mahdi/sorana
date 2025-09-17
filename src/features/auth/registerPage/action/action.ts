'use server'

import prisma from '@/shared/utils/db'
import bcrypt from 'bcryptjs'
import { TRegisterResponse } from '../types/type'

export async function registerUser(
  formData: FormData
): Promise<TRegisterResponse> {
  const errors: Record<string, string> = {}

  const userName = formData.get('userName') as string
  const password = formData.get('password') as string
  const userPhone = formData.get('userPhone') as string

  if (!userPhone) errors.userPhone = 'وارد کردن شماره همراه اجباری'
  if (!password) errors.password = 'وارد کردن رمز اجباری'
  if (!userName) errors.userName = 'وارد کردن نام کاربری اجباری'

  if (Object.keys(errors).length > 0) {
    return { type: 'error', errors }
  }

  try {
    // بررسی وجود کاربر
    const existingUser = await prisma.user.findUnique({ where: { userPhone } })

    if (existingUser?.ban) {
      errors.phone = 'این حساب کاربری مسدود شده'
      return { type: 'error', errors }
    }

    if (existingUser) {
      errors.phone = 'این شماره همراه قبلا ثبت نام کرده'
      return { type: 'error', errors }
    }

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 10)

    // ساخت کاربر
    await prisma.user.create({
      data: {
        userName: userName,
        password: hashedPassword,
        userPhone,
      },
    })

    return { type: 'success', message: 'ثبت نام با موفقیت انجام شد!' }
  } catch (err) {
    console.error('Register error:', err)
    return {
      type: 'error',
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید.' },
    }
  }
}
