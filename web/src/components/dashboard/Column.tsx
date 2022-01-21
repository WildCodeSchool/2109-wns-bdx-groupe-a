import TemplateTicket from '../ticket/template/TemplateTicket';

type Props = {
  title: string;
  ticket: {
    name: string;
    description: string;
  }[];
};
const Column = ({ title, ticket }: Props) => {
  return (
    <>
      <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-12 ml-12 mt-12'>
        <section
          aria-labelledby='primary-heading'
          className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100 bg-gray-100 rounded-t-lg'
        >
          <h1 className='flex justify-center border-b bg-indigo-600 rounded-t-lg text-white'>
            {title}
          </h1>
          {ticket.map(({ name, description }) => (
            <TemplateTicket name={name} description={description} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Column;
