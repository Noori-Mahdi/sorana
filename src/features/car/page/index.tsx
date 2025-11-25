import Container from '@/shared/components/container'
import Image from 'next/image'

const CarPage = () => {
  return (
    <Container>
      <div className="bg-bg-primary border-primary-700 flex rounded-md border p-6">
        <div className="relative flex h-[150px] items-center justify-center p-5">
          <Image
            alt=""
            src={
              '/uploads/car/1758180160463-Toyota-Corolla-Touring-Sports-Transparent-Background.png'
            }
            width={120}
            height={120}
          />
          <Image
            alt=""
            src={
              '/uploads/company/1758177272938-5ec3e2db58550c0004427740 (1).png'
            }
            width={50}
            height={50}
            className="absolute top-0 left-0"
          />
        </div>
        <div className="border-primary-700 grid flex-1 grid-cols-2 flex-col gap-6 border-r px-5">
          <div className={'flex items-center gap-3'}>
            <div> دیسک ترمز جلو</div>
            <ul className='flex gap-5'>
              <li>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={50}
                  height={50}
                />
              </li>
              <li>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={50}
                  height={50}
                />
              </li>
              <li>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={50}
                  height={50}
                />
              </li>
            </ul>
          </div>
          <div className={'flex items-center gap-3'}>
            <div>ترمز جلو</div>
            <ul>
              <li>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={50}
                  height={50}
                />
              </li>
            </ul>
          </div>
          <div className={'flex items-center gap-3'}>
            <div>دیسک ترمز عقب</div>
            <ul>
              <li>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={50}
                  height={50}
                />
              </li>
            </ul>
          </div>
          <div className={'flex items-center gap-3'}>
            <div>ترمز عقب</div>
            <ul>
              <li>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={50}
                  height={50}
                />
              </li>
            </ul>
          </div>
          <div className={'flex items-center gap-3'}>
            <div>کفشک ترمز دستی</div>
            <ul>
              <li>
                <Image
                  alt=""
                  src={'/uploads/test/test1.png'}
                  width={50}
                  height={50}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CarPage
