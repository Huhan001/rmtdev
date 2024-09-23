import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";

export default function PaginationControls() {

  return (
    <section className="pagination">
      <button className= 'pagination__button'> <ArrowLeftIcon/> Page 1 </button>
      <button className= 'pagination__button'> Page 2 <ArrowRightIcon/> </button>
    </section>
  );
}
