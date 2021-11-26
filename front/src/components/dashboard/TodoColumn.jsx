import TemplateTicket from '../ticket/template/TemplateTicket';

const TodoColumn = ({ title, ticketsList }) => {
  return (
    <>
      <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-8 ml-8'>
        <section
          aria-labelledby='primary-heading'
          className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100'
        >
          <h1 className='flex justify-center border-b bg-gray-100'>{title}</h1>
          {ticketsList.map(({ name, description }) => (
            <TemplateTicket name={name} description={description} />
          ))}
        </section>
      </main>
    </>
  );
};

export default TodoColumn;
