import { PrismaClient } from '../src/generated/prisma'; // مسیر صحیح client
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 شروع seeding برای Sold ...');

  // کاربران موجود را می‌گیریم
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('❌ هیچ کاربری در دیتابیس نیست! لطفاً اول کاربر بساز.');
    return;
  }

  // آیدی محصولات داده‌شده
  const productIds = [
    'eced7ca8-a495-427c-b259-e0e4e7228393',
    'ebba3aa2-0a3a-485a-a6f4-0c91043945e4',
    'e7cc469c-ca14-4760-b1dc-0f1ed63792b8',
    'e23d1416-6004-43e3-bfd2-8fdb1724d95c',
    'a55cf22d-5261-43d5-8111-88ab678d8ad0',
    '9e11cab0-94bd-435f-8d82-d0fe7eadce0c',
    '1889da75-0e23-402e-b9ed-949c8b66934d',
    '484487ee-feaa-4c6b-9e9e-b233b06ef541',
  ];

  // بررسی اینکه آیا محصولات وجود دارند
  const existingProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (existingProducts.length !== productIds.length) {
    console.log('⚠️ برخی از آیدی‌های محصولات در دیتابیس وجود ندارند.');
  }

  // ساخت داده‌های فروش
  const soldData = productIds.map((productId, i) => ({
    productId,
    quantity: Math.floor(Math.random() * 3) + 1, // عدد 1 تا 3
    price: 100000 + i * 25000, // قیمت پایه + افزایشی
    userId: users[i % users.length].id, // هر فروش متعلق به یک کاربر
  }));

  await prisma.sold.createMany({ data: soldData });
  console.log(`✅ ${soldData.length} رکورد فروش ساخته شد.`);

  console.log('🌿 Seed فروش با موفقیت انجام شد.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ خطا در seeding فروش:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
