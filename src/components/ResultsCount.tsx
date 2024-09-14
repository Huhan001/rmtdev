import {LoadStore} from "../GeneralStore.tsx/Store.tsx";

export default function ResultsCount() {
  const counting = LoadStore(state => state.fetchedData.length)
  return <p className="count"> {counting ? counting : 0} results</p>;
}
