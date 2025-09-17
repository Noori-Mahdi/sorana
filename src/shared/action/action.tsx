'use server'

import { cookies } from 'next/headers'
import prisma from '@/shared/utils/db'
import jwt from 'jsonwebtoken'

export async function verifyUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    // verify JWT
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as {
      id: string
    }

    // کاربر رو از DB پیدا کن
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    })

    return !!user
  } catch (err) {
    console.error('Invalid token', err)
    return null
  }
}
