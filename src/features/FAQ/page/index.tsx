import Container from '@/shared/components/container'
import { IoClose } from 'react-icons/io5'
import AccordionItem from '../Components/AccordionItem'

const FAQPage = () => {
  return (
    <Container>
      <ul>
        <li>
          <AccordionItem
            answer="سوال اول"
            id="1"
            question=" لشسیلمنشستیل نماسیتنلما شتنیلا "
          />
        </li>
      </ul>
    </Container>
  )
}

export default FAQPage
