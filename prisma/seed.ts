import { PrismaClient } from '../src/generated/prisma'; // مسیر خروجی client طبق schema‌ تو
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 شروع seeding برای Comment و Sold ...');

  // کاربران موجود را می‌گیریم
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log('❌ هیچ کاربری در دیتابیس نیست! لطفاً اول کاربر بساز.');
    return;
  }

  // ----------- 1. کامنت‌ها -----------
  const commentsData = Array.from({ length: 10 }).map((_, i) => ({
    title: `نظر شماره ${i + 1}`,
    content: `این یک متن تستی برای نظر شماره ${i + 1} است.`,
    rate: (i % 5) + 1,
    userId: users[i % users.length].id, // نسبت دادن به کاربر تصادفی
  }));

  await prisma.comment.createMany({ data: commentsData });
  console.log('✅ 10 کامنت ساخته شد.');

  // ----------- 2. خریدها -----------
  const soldData = Array.from({ length: 10 }).map((_, i) => ({
    productName: `محصول شماره ${i + 1}`,
    quantity: (i % 3) + 1,
    price: 100000 + i * 5000,
    userId: users[i % users.length].id,
  }));

  await prisma.sold.createMany({ data: soldData });
  console.log('✅ 10 خرید ساخته شد.');

  console.log('🌿 Seed با موفقیت انجام شد.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
