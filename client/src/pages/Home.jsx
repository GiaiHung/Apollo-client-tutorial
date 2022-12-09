import Clients from '../components/Clients/Clients'
import ClientModal from '../components/Modals/ClientModal'
import ProjectModal from '../components/Modals/ProjectModal'
import Projects from '../components/Projects/Projects'

function Home() {
  return (
    <>
      <div className='d-flex align-items-center gap-2'>
        <ClientModal />
        <ProjectModal />
      </div>
      <Projects />
      <Clients />
    </>
  )
}

export default Home