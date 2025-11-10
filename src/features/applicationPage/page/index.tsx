import Container from '@/shared/components/container'
import SearchForm from '../components/searchForm'
import ListItem from '../components/listItems/index'
import { getCompany } from '@/features/admin-panel/action/companyAction'

const ApplicationPage = async () => {
  const company = await getCompany()

  return (
    <Container>
      <SearchForm list={company.type === 'success' ? company.data : []} />
      <ListItem />
    </Container>
  )
}

export default ApplicationPage
