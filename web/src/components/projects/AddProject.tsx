

const AddProject = () => {

  return (
    <form action="#" className="relative" style={{width: "400px"}}>
    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
        placeholder="Titre"
      />
      <label htmlFor="description" className="sr-only">
        Description
      </label>
      <textarea
        rows={4}
        name="description"
        id="description"
        className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder="Écrire une description..."
        defaultValue={''}
      />

      {/* Spacer element to match the height of the toolbar */}
      <div aria-hidden="true">
        <div className="py-2">
          <div className="h-9" />
        </div>
        <div className="h-px" />

      </div>
    </div>

    <div className="absolute inset-x-px bottom-0">
      {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
      <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
       

       

      
      </div>
      <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
        <div className="flex">
        
        </div>
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  </form>
  )
}

export default AddProject