import { GET_PROJECTS_BY_USER_ID } from "../../graphql";
import { useQuery } from "@apollo/client";
import { ProjectsData, ProjectType, SidebarNavigation } from "../../types/projects/ProjectType";
import { UserProfile } from "../../types/user/UserProfileTypes";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { ProjectForm } from "../project";



interface props {
  user : UserProfile
}

const LeftMenu = ( { user } : props) => {
  const { myProfile } = user
  const { data } = useQuery<ProjectsData>(GET_PROJECTS_BY_USER_ID, {
    variables: {userId : myProfile.id }
  })

  const [ projects, setProjects ] = useState<Array<ProjectType>>([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    if (data) {
      const { getProjectByUserId } = data;
      setProjects(getProjectByUserId)
    }
  }, [data])

  const sidebarNavigation: Array<SidebarNavigation> = []
  
  if(projects) {
    projects.forEach(project => sidebarNavigation.push({ project, current: false, href: '#' }))
  }


  return (
    <nav
      aria-label='Sidebar'
      className='hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto'
    >
      <div className='relative w-20 flex flex-col p-3 space-y-3'>
        
        { sidebarNavigation.map(item => (
            <Link
              key={item.project.id}
              to={`/dashboard/${item.project.id}`}
              className='bg-gray-900 text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
            >
             { item.project.picture ? <img src={item.project.picture} className='h-6 w-6' aria-hidden='true' /> : <span> {item.project.title} </span> }
            </Link>
          )
        )} 

        <button           
          type="button"
          onClick={openModal}
          className='bg-gray-900 text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'>
            +
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Item Modal"
        ariaHideApp={false}
      >
        <div className="w-96">
          <ProjectForm user={user} onClose={closeModal}/>
        </div>
      </Modal>
    </nav>
  );
};

export default LeftMenu;
