import TemplateTicket from '../ticket/template/TemplateTicket';
import { ReactSortable } from 'react-sortablejs';

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
  const { published, setpublished } = props;
  return (
    <>
      <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-12 ml-12 mt-12'>
        <section
          aria-labelledby='primary-heading'
          className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100 bg-gray-100 rounded-t-lg'
        >
          <h1 className='flex justify-center border-b bg-indigo-600 rounded-t-lg text-white'>
            Validé
          </h1>
          <ReactSortable
            list={published}
            setList={setpublished}
            group={{ name: 'group-1', put: true }}
          >
            {published.map((task, idx) => (
              <TemplateTicket
                key={idx}
                id={task.id}
                name={task.title}
                description={task.description}
              />
            ))}
          </ReactSortable>
        </section>
      </main>
    </>
  );
};

export default Column;
