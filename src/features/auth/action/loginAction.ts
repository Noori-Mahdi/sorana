'use server'

import prisma from '../../../../prisma.config'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

import jwt from 'jsonwebtoken'
import { TLoginInputKeys, TLoginResponse } from '../types/type'

export async function loginUser(formData: FormData): Promise<TLoginResponse> {
  const errors: Partial<Record<TLoginInputKeys | 'general', string[]>> = {}

  const userPhone = formData.get('userPhone') as string
  const password = formData.get('password') as string

  if (!userPhone) errors.userPhone = ['وارد کردن شماره همراه اجباری']
  if (!password) errors.password = ['وارد کردن رمز اجباری']

  if (Object.keys(errors).length > 0) {
    return { type: 'error', errors }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userPhone },
    })

    if (!user) {
      errors.userPhone = ['این شماره همراه قبلا ثبت نام نشده']
      return { type: 'error', errors }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      errors.password = ['رمز عبور اشتباه است']
      return { type: 'error', errors }
    }

    // تولید JWT
    const tokenData = { id: user.id }
    const token = jwt.sign(tokenData, process.env.JWT_KEY as string, {
      expiresIn: '1d',
    })

    // ذخیره در کوکی
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'token',
      value: token,
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    })

    return {
      type: 'success',
      message: 'ورود با موفقیت انجام شد',
    }
  } catch (err) {
    console.error('Login error:', err)
    return {
      type: 'error',
      errors: {
        general: ['خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.'],
      },
    }
  }
}
