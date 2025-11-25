import Button from '@/shared/components/button'
import Container from '@/shared/components/container'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'

const ProductPage = () => {
  return (
    <Container>
      <div className="flex items-center gap-2 pb-3">
        <span>{`خانه`}</span>
        <span>{`>`}</span>
        <span>{`فروشگاه`}</span>
        <span>{`>`}</span>
        <span>{`محصولات`}</span>
        <span>{`>`}</span>
        <span>{`PN1479`}</span>
      </div>
      <div className="bg-bg-primary border-primary-900 mb-3 flex rounded-md border-2 p-2">
        <div className="border-primary-700 flex flex-col gap-7 border-l-2 p-3">
          <div>
            <FaHeart />
          </div>
          <div>
            <Image
              alt="PN1479"
              src={'/uploads/test/test1.png'}
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex-1 p-3">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3 text-sm font-bold">
              <div className="flex gap-2">
                <span>نام شرکت:</span>
                <span> HIQ</span>
              </div>
              <div className="flex gap-2">
                <span> نوع:</span>
                <span>لنت جلو</span>
              </div>
              <div className="flex gap-2">
                <span> کشور:</span>
                <span>آلمان</span>
              </div>
              <div className="flex gap-2">
                <span>کد فنی :</span>
                <span>PN1479</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-5">
            <Button
              type="button"
              size="fit"
              rounded="small"
              className="p-2"
              label="اضافه کردن به سبد خرید"
            />
            <div>
              <span>قیمت:</span>
              <span>1,250,000 تومان</span>
            </div>
          </div>
        </div>
      </div>
      
    <div className="bg-bg-primary  justify-between items-center border-primary-900 flex rounded-md border-2 p-2">
        <div className="flex gap-2">
          <span> length:</span>
          <span>131.6</span>
        </div>
        <div className="flex gap-2">
          <span> width:</span>
          <span>58.5</span>
        </div>
        <div className="flex gap-2">
          <span> Thickness:</span>
          <span>17.3</span>
        </div>
        <div className="flex gap-2">
          <span> PcsInSet:</span>
          <span>4</span>
        </div>
        <div className="flex gap-2">
          <span> BrakeSystem:</span>
          <span>AKEBONO</span>
        </div>
        <Image
          alt=""
          src={'/uploads/product/PN1479.jpg'}
          height={60}
          width={200}
        />
      </div>
    </Container>
  )
}

export default ProductPage
