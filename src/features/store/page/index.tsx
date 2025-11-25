import Button from '@/shared/components/button'
import Container from '@/shared/components/container'
import FilterCheckboxGroup from '@/shared/components/FilterBox'
import SearchBox from '@/shared/components/search-box'
import Image from 'next/image'
import { BsBasket3Fill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'

const StorePage = () => {
  return (
    <Container>
      <div className='flex justify-between items-center pb-4'>
        <div className="flex items-center justify-center gap-2">
          <span>{`خانه`}</span>
          <span>{`>`}</span>
          <span>{`فروشگاه`}</span>
          <span>{`>`}</span>
          <span>{`محصولات`}</span>
        </div>
        <div className='flex gap-3 text-sm font-bold'>
          <span>ماشین‌ها</span><span>/</span><span>محصولات</span>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          <SearchBox open value="" />
          <FilterCheckboxGroup
            title="موجود بودن"
            options={['موجود', 'همه']}
            // onChange={(values) => console.log(values)}
          />
          <FilterCheckboxGroup
            title="قطعات"
            options={[
              'لنت ترمز دستی',
              'ترمز عقب',
              'دیسک ترمز عقب',
              'ترمز جلو',
              'دیسک ترمز جلو',
            ]}
            // onChange={(values) => console.log(values)}
          />
          <FilterCheckboxGroup
            title="برندها"
            options={['HIQ', 'HIQ', 'HIQ', 'HIQ', 'HIQ', 'HIQ']}
            // onChange={(values) => console.log(values)}
          />
          <FilterCheckboxGroup
            title="کشورها"
            options={['ژاپن', 'چین', 'آلمان', 'ایتالیا', 'کره']}
            // onChange={(values) => console.log(values)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-bg-primary border-primary-700 flex items-center justify-between rounded-md border-2 p-4">
            <span>مرتب سازی بر اساس:</span>
            <span>جدیدترین‌</span>
            <span>بیشترین تخفیف</span>
            <span>گران‌ترین</span>
            <span>ارزان‌ترین</span>
            <span>محبوب‌ترین</span>
          </div>
          <div>
            <ul className="flex flex-wrap">
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
              <li className="bg-bg-primary border-primary-700 flex w-1/4 flex-col items-center justify-center gap-5 rounded-md border px-4 py-3 text-sm">
                <Image
                  alt={'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                  src={'/uploads/test/test1.png'}
                  width={80}
                  height={80}
                />

                <div className="text-center">
                  {'لنت ترمز جلو ساینا برند های کیو HI-Q اصل کره'}
                </div>

                <div>{'1,122,000 تومان'}</div>

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
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default StorePage
