import TemplateTicket from '../ticket/template/TemplateTicket';
import { ReactSortable } from 'react-sortablejs';
import { gql, useQuery, useMutation } from '@apollo/client';

type Props = {
  // title: string;
  props: {
    ideas: any[];
    todo: any[];
    inprogress: any[];
    published: any[];
    setideas: React.Dispatch<React.SetStateAction<any[]>>;
    settodo: React.Dispatch<React.SetStateAction<any[]>>;
    setinprogress: React.Dispatch<React.SetStateAction<any[]>>;
    setpublished: React.Dispatch<React.SetStateAction<any[]>>;
  };
};
const Column = ({ props }: Props) => {
  const TASK_PROGRESS_STATE = gql`
    mutation ($updateTaskId: String!, $progressState: String) {
      updateTask(id: $updateTaskId, progress_state: $progressState) {
        title
        description
        attachment
        id
        progress_state
      }
    }
  `;
  const [changeProgressState, { data, loading, error }] =
    useMutation(TASK_PROGRESS_STATE);
  const { ideas, setideas } = props;
  return (
    <>
      <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-12 ml-12 mt-12'>
        <section
          aria-labelledby='primary-heading'
          className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100 bg-gray-100 rounded-t-lg'
        >
          <h1 className='flex justify-center border-b bg-indigo-600 rounded-t-lg text-white'>
            En traitement
          </h1>
          <ReactSortable
            list={ideas}
            setList={setideas}
            group={{ name: 'group-1', put: true }}
          >
            {ideas.map((task, idx) => (
              <>
                <TemplateTicket
                  key={idx}
                  id={task.id}
                  name={task.title}
                  description={task.description}
                  progressState='3'
                />
              </>
            ))}
          </ReactSortable>
        </section>
      </main>
    </>
  );
};

export default Column;
