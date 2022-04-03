import { useMutation } from '@apollo/client';
import { DELETE_TASK } from '../../../graphql/mutations/tasks/DeleteTaskMutation';
import { GET_TASKS } from '../../../graphql/queries/QGetTasks';
import { TaskType } from '../../../types/tasks/TaskType'

const Ticket = ({task, id}: {task: TaskType, id: string}) => {
  const [deleteTask, {}] = useMutation(DELETE_TASK);

  return (
    <div className='bg-blue w-full flex justify-center font-sans '>
        <div className='rounded bg-grey-light w-full mt-2'>
          <div className='text-sm '>
            <div className='bg-white p-4 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter'>
              <div className='flex justify-between'>
                <div className='inline-flex w-full justify-between'>
                <h3 className='text-sm'>{task.title} </h3>
                <span className="mr-1">n°{task.id}</span>
                </div>
                <svg
                  className='h-4 fill-current text-grey-dark cursor-pointer'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z' />
                </svg>
              </div>
              <hr className='mt-2 mb-2 border-indigo-500' />
              {task.description}
              <button
                  onClick={() => deleteTask({ variables: {deleteTaskId: id}, refetchQueries: [ GET_TASKS ]})}
                  // onClick={() => onClose()}
                  className="inline-flex items-center px-1 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  X
                </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Ticket