import { SearchIcon } from "@heroicons/react/solid";

interface props {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchTerm, setSearchTerm } : props) => {
	return (
		<div className="w-96 h-8 border items-center flex justify-center ml-2 rounded border-solid border-gray-300 relative text-gray-400 focus-within:text-gray-500 focus:outline-none">
			<label htmlFor="desktop-search" className="sr-only">
				Search
			</label>
			<input
				id="desktop-search"
				type="search"
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				className="focus:outline-none block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0 text-indigo-600"
			/>
			<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
				<SearchIcon className="h-5 w-5" aria-hidden="true" />
			</div>
		</div>
	)
}

export default SearchBar