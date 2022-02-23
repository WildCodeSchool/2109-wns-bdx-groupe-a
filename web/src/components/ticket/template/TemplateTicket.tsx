import AddButton from '../addButton/AddButton';
type Props = {
  name: string;
  description: string;
  id: string;
};
const TemplateTicket = ({ name, description, id }: Props) => {
  return (
    <div className='bg-blue w-full p-2 flex justify-center font-sans '>
      <div className='rounded bg-grey-light w-64 p-2 '>
        <div className='text-sm '>
          <div className='bg-white p-4 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter'>
            <div className='flex justify-between'>
              <h3 className='text-sm'>{name}</h3>
              <svg
                className='h-4 fill-current text-grey-dark cursor-pointer'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z' />
              </svg>
            </div>
            <hr className='mt-2 mb-2 border-indigo-500' />
            id: {id}
            <div className='flex justify-end mt-2'>
              <AddButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTicket;
