import BannerSlider from '@/shared/components/Banner'
import ProductSlider from '@/shared/components/ProductSliderTest'
import Catgory from '@/shared/ui/Catgory'
import CountrySlider from '@/shared/ui/CountrySlider'
import Header from '@/shared/ui/header'
import LogoSlider from '@/shared/ui/LogoSlider'
import MobileNav from '@/shared/ui/mobileNav'
import NewsBox from '@/shared/ui/News'
import ProviderSlider from '@/shared/ui/providerSlider'

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <BannerSlider
        images={[
          { src: '/banner/baner1.jpg', alt: 'test' },
          { src: '/banner/banner2.jpg', alt: 'test' },
        ]}
      />

      <ProductSlider />
      <ProductSlider />
      <ProductSlider />
      <CountrySlider />
      <LogoSlider />
      <ProviderSlider />

      <Catgory />
      <NewsBox />
    </div>
  )
}

export default HomePage
