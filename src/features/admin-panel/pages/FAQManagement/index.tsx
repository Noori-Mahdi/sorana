import AccordionItem from '@/features/FAQ/Components/AccordionItem'
import { getFAQ } from '../../action/FAQAction'
import AddFAQForm from '../../components/FAQ/FAQAdd'
import { MdEdit } from 'react-icons/md'
import { IoTrashBinSharp } from 'react-icons/io5'
import FAQOption from '../../components/FAQ/FAQOption'

const FAQManagement = async () => {
  const FAQData = await getFAQ()
  return (
    <div className="flex flex-col gap-4 p-3">
      <AddFAQForm />
      <ul className="flex flex-col gap-2">
        {FAQData.type === 'success' && FAQData.data ? (
          FAQData.data.map((e) => (
            <li key={e.id}>
              <AccordionItem
                id={e.id}
                header={e.questions}
                body={e.answer}
                option={
                  <FAQOption id={e.id} header={e.questions} body={e.answer} />
                }
              />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default FAQManagement
