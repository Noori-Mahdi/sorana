import Image from 'next/image'
import { FaHeart } from 'react-icons/fa6'
import { BsBasket3Fill } from 'react-icons/bs'
import Button from '../button'
import HorizontalSlider from '../Slider'
import Container from '../container'

export default function ProductSlider() {
  // آرایه ۱۰ آیتم (نمونه - قابل تغییر)
  const products = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: 'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره',
    price: '1,122,000 تومان',
    image: '/uploads/test/test1.png',
  }))

  return (
    <Container className=''>
      <HorizontalSlider title='پر فروش ترین‌ ها'>
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-bg-secondary flex w-[170px] min-w-[170px] flex-col items-center justify-center gap-5 rounded-md px-4 py-3 text-sm"
          >
            <Image
              alt={product.title}
              src={product.image}
              width={80}
              height={80}
            />

            <div className="text-center">{product.title}</div>

            <div>{product.price}</div>

            <div className="flex items-center justify-between gap-3">
              <Button
                color="transparent"
                type="button"
                size="small"
                buttomIcon={<FaHeart />}
                rounded="full"
              />

              <Button
                color="transparent"
                type="button"
                size="small"
                buttomIcon={<BsBasket3Fill />}
                rounded="full"
              />
            </div>
          </li>
        ))}
      </HorizontalSlider>
    </Container>
  )
}
