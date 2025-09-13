import { PrismaClient } from '@/generated/prisma'

declare global {
  // اضافه کردن نوع به globalThis
  // @ts-ignore
  var prismaGlobal: PrismaClient | undefined
}

// ایجاد singleton برای PrismaClient
const prisma = globalThis.prismaGlobal ?? new PrismaClient()

// ذخیره نمونه در globalThis برای توسعه
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}

export default prisma
