'use server'

import prisma from '@/shared/utils/db'
import fs from 'fs'
import path from 'path'

export type TUser = {
  id: string
  userName: string
  userPhone: string
  companyName?: string | null
  companyphone?: string | null
  image?: string | null
  addrace?: string | null
  email?: string | null
  role: 'owner' | 'admin' | 'support' | 'user'
  ban: boolean
  comments?: number
  buy?: number
  status: 'online' | 'offline'
  lastLogin: Date | null
  createdAt: Date
}

export type TResponse<T> =
  | { type: 'success'; data: T }
  | { type: 'error'; errors: Record<string, string> }

// گرفتن همه کاربران
export async function getUsers(page: number): Promise<TResponse<TUser[]>> {
  console.log('page', page)
  try {
    const take = 6
    const skip = (page - 1) * take
    const users = await prisma.user.findMany({
      take,
      skip,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userName: true,
        userPhone: true,
        companyName: true,
        companyphone: true,
        image: true,
        addrace: true,
        email: true,
        role: true,
        ban: true,
        status: true,
        lastLogin: true,
        createdAt: true,
        comments: { select: { id: true } },
        buy: { select: { id: true } },
      },
    })

    const formatted: TUser[] = users.map((u) => ({
      ...u,
      comments: u.comments.length,
      buy: u.buy.length,
    }))

    return { type: 'success', data: formatted }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در دریافت کاربران' } }
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
  data: Partial<{
    createdAt: Date
    lastLogin: Date
    ban: boolean
    role: 'owner' | 'admin' | 'support' | 'user'
    email: string
    userName: string
    userPhone: string
    companyName: string
    companyphone: string
    imageFile: File
    addrace: string
  }>
): Promise<TResponse<TUser>> {
  try {
    let imageUrl: string | undefined

    if (data.imageFile) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true })

      const fileName = `${Date.now()}-${data.imageFile.name}`
      const filePath = path.join(uploadsDir, fileName)
      const buffer = Buffer.from(await data.imageFile.arrayBuffer())
      await fs.promises.writeFile(filePath, buffer)

      imageUrl = `/uploads/${fileName}`
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        image: imageUrl ?? undefined,
      },
    })

    return { type: 'success', data: updated }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در ویرایش کاربر' } }
  }
}


export async function deleteUserAction(id: string): Promise<TResponse<null>> {
  try {
    await prisma.user.delete({ where: { id } })
    return { type: 'success', data: null }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در حذف کاربر' } }
  }
}

export async function blockUserAction(
  id: string,
  ban: boolean
): Promise<TResponse<TUser>> {
  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { ban },
    })
    return { type: 'success', data: updated }
  } catch (err) {
    console.error(err)
    return { type: 'error', errors: { general: 'خطا در تغییر وضعیت بلاک کاربر' } }
  }
}