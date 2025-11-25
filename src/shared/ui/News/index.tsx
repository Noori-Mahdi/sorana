import Container from "@/shared/components/container"
import Image from "next/image"

const NewsBox = () => {
  return (
    <Container>
      <div className="flex justify-between gap-6">
        <ul className="flex flex-1 flex-col">
          <li className="bg-bg-primary mb-6 flex items-center gap-6 rounded-md p-2">
            جدیدترین مقالات
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            بهترین لنت ترمز برای خودروهای شهری؛ چه مارکی بخریم؟
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            راهنمای خرید لنت ترمز؛ نکاتی که قبل از خرید باید بدانید
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            تفاوت لنت ترمز ارگانیک، نیمه فلزی و سرامیکی چیست؟
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            مزایا و معایب لنت ترمز سرامیکی
          </li>
        </ul>
        <ul className="flex flex-1 flex-col">
          <li className="bg-bg-primary mb-6 flex items-center justify-center gap-6 rounded-md p-2">
            جدیدترین ویدیو‌ها
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            <div className="h-[100px] w-[70px] rounded-md">
              <Image
                width={50}
                height={100}
                alt=""
                src={'/video/video1.jpg'}
                className="h-full w-full rounded-md"
              />
            </div>
            <div className="text-sm font-bold">امنیت بیشتر، عملکرد بهتر</div>
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            <div className="h-[100px] w-[70px] rounded-md">
              <Image
                width={50}
                height={100}
                alt=""
                src={'/video/video2.jpg'}
                className="h-full w-full rounded-md"
              />
            </div>
            <div className="text-sm font-bold">
              لنت ترمز اسپرت؛ انتخاب حرفه‌ای‌ها
            </div>
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            <div className="h-[100px] w-[70px] rounded-md">
              <Image
                width={50}
                height={100}
                alt=""
                src={'/video/video3.jpg'}
                className="h-full w-full rounded-md"
              />
            </div>
            <div className="text-sm font-bold">ترمز بگیر؛ با خیال راحت!</div>
          </li>
          <li className="bg-bg-primary mb-2 flex items-center gap-6 rounded-md p-2">
            <div className="h-[100px] w-[70px] rounded-md">
              <Image
                width={50}
                height={100}
                alt=""
                src={'/video/video4.jpg'}
                className="h-full w-full rounded-md"
              />
            </div>
            <div className="text-sm font-bold">کیفیت بالا، توقف دقیق</div>
          </li>
        </ul>
      </div>
    </Container>
  )
}

export default NewsBox
