import {LoadStore} from "../GeneralStore.tsx/Store.tsx";

export default function SortingControls() {

  const sortByRelevance = LoadStore(state => state.sortByRelevance)
  const sortByRecent = LoadStore(state => state.sortByRecent)

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button onClick={sortByRelevance} className="sorting__button sorting__button--relevant">
        Relevant
      </button>

      <button onClick={sortByRecent} className="sorting__button sorting__button--recent">
        Recent
      </button>
    </section>
  );
}
