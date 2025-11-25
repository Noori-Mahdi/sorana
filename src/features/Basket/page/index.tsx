import Button from '@/shared/components/button'
import Container from '@/shared/components/container'
import Image from 'next/image'
import { FaTruck, FaWallet } from 'react-icons/fa'
import { FaBasketShopping } from 'react-icons/fa6'
import { IoMdCheckmark } from 'react-icons/io'

const BasketPage = () => {
  return (
    <Container>
      <div className="bg-bg-primary border-primary-700 mb-3 flex items-center justify-between gap-3 rounded-md border p-6">
        <div className="flex flex-col items-center justify-center gap-3">
          {' '}
          <FaBasketShopping />
          <div>تایید سبد خرید</div>{' '}
        </div>
        <div className="bg-accent-300 h-0.5 flex-1"></div>
        <div className="flex flex-col items-center justify-center gap-3">
          <FaTruck />
          <div className="text-sm">انتخاب آدرس و شیوه ارسال</div>{' '}
        </div>
        <div className="bg-accent-300 h-0.5 flex-1"></div>
        <div className="flex flex-col items-center justify-center gap-3">
          <FaWallet />
          <div className="text-sm">انتخاب روش پرداخت</div>{' '}
        </div>
        <div className="bg-accent-300 h-0.5 flex-1"></div>
        <div className="flex flex-col items-center justify-center gap-3">
          <IoMdCheckmark />
          <div className="text-sm">پرداخت نهایی و اتمام سفارش</div>{' '}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <div className="pb-3">محتوای سبد خرید </div>
          <ul>
            <li className="bg-bg-primary border-primary-700 flex gap-6 rounded-md border-1 p-6">
              <div>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex-1">
                <div>RN140</div>
                <div className="flex items-end justify-between">
                  <div className="flex items-center justify-between gap-10">
                    <div>-</div>
                    <div>4</div>
                    <div>+</div>
                    <div>delete</div>
                  </div>
                  <div>
                    <div>
                      <span>قیمت واحد </span>
                      <span>1400</span>
                    </div>
                    <div>
                      {' '}
                      <span>قیمت کل </span>
                      <span>1400</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <div className="">خلاصه سبد خرید</div>
          <div className="bg-bg-primary border-primary-700 rounded-md border-1 p-6">
            <div>
              <div>
                <span>مجموعه سبد خرید</span>
                <span>1400</span>
              </div>
              <div>
                <span> تخفیف </span>
                <span>100</span>
              </div>
            </div>
            <div>
              <span>جمع کل </span>
              <span>1300</span>
            </div>
          </div>
          <Button type="button" label="خرید" rounded="normal" />
        </div>
      </div>
    </Container>
  )
}

export default BasketPage
