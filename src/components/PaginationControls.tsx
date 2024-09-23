import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";

export default function PaginationControls() {
  const paginate = LoadStore(state => state.paginationBreak);
  const paginationIndex = LoadStore(state => state.paginationIndex);
  const fetchedData = LoadStore(state => state.fetchedData);
  const paginationPage = LoadStore(state => state.paginationPage)



  return (
    <section className="pagination">
      <button disabled={paginationIndex[0] <= 0} onClick={() => paginate("sfdf")} className= 'pagination__button'> <ArrowLeftIcon/> Page {paginationPage[0]} </button>
      <button disabled={paginationIndex[1] > fetchedData?.length} onClick={() => paginate("increase")} className= 'pagination__button'> Page {paginationPage[1]} <ArrowRightIcon/> </button>
    </section>
  );
}
