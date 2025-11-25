import Container from "@/shared/components/container"
import Image from "next/image"

const Catgory = () => {
  return (
    <Container>
      <ul className="bg-bg-primary flex items-center justify-center rounded-xl p-2">
        <li className="hover:bg-bg-secondary flex h-[150px] w-[150px] cursor-pointer items-center justify-center rounded-md transition-all duration-300 ease-out hover:scale-105">
          <Image alt="" src={'/icon/icon1.png'} width={80} height={80} />
        </li>
        <li className="hover:bg-bg-secondary flex h-[150px] w-[150px] cursor-pointer items-center justify-center rounded-md transition-all duration-300 ease-out hover:scale-105">
          <Image alt="" src={'/icon/icon2.png'} width={80} height={80} />
        </li>
        <li className="hover:bg-bg-secondary flex h-[150px] w-[150px] cursor-pointer items-center justify-center rounded-md transition-all duration-300 ease-out hover:scale-105">
          <Image alt="" src={'/icon/icon3.png'} width={80} height={80} />
        </li>
        <li className="hover:bg-bg-secondary flex h-[150px] w-[150px] cursor-pointer items-center justify-center rounded-md transition-all duration-300 ease-out hover:scale-105">
          <Image alt="" src={'/icon/icon4.png'} width={80} height={80} />
        </li>
      </ul>
    </Container>
  )
}

export default Catgory
