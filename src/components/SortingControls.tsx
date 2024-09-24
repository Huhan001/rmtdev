import {LoadStore} from "../GeneralStore.tsx/Store.tsx";

export default function SortingControls() {

  const sortByRelevance = LoadStore(state => state.sortByRelevance)
  const sortByRecent = LoadStore(state => state.sortByRecent)
  const sortActive = LoadStore(state => state.sortActive)

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button onClick={sortByRelevance} className= {`sorting__button sorting__button--relevant ${sortActive === "relevant" ?"sorting__button--active" : ""}`}>
        Relevant
      </button>

      <button onClick={sortByRecent} className={`sorting__button sorting__button--recent ${sortActive === "recent" ?"sorting__button--active" : ""}`}>
        Recent
      </button>
    </section>
  );
}


//go for simplicity and maintainability always.