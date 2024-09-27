import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover.tsx";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";


export default function BookmarksButton() {
  const setOpenPopUp = LoadStore(state => state.setopenPopUp)
  const openPopUp = LoadStore(state => state.openPopUp)


  return (
    <section>
      <button onClick={(e) =>{setOpenPopUp(); e.preventDefault(); e.stopPropagation()}} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
      {openPopUp && <BookmarksPopover />}
    </section>
  );
}
