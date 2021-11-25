const Column = ({ title, description }) => {
  return (
    <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-8 ml-8'>
      <section
        aria-labelledby='primary-heading'
        className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100'
      >
        <h1 id='primary-heading' className='sr-only capitalize'>
          {title}
        </h1>
        <p className='flex justify-center border-b bg-gray-100'>
        {description}
        </p>
      </section>
    </main>
  );
};

export default Column;
