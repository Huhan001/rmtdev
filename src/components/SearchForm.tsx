import {LoadStore} from "../GeneralStore.tsx/Store.tsx";

export default function SearchForm() {
  const searchText = LoadStore(state => state.searchText)
  const setSearchText = LoadStore(state => state.setSearchText)


  return (
    <form onSubmit={(event) => event.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value= {searchText}
        onChange = {setSearchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
