import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover.tsx";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import {useEffect} from "react";


export default function BookmarksButton() {
  const setOpenPopUp = LoadStore(state => state.setopenPopUp)
  const openPopUp = LoadStore(state => state.openPopUp)

//  const openOrNAH = useRef('')


  useEffect(() => {
//    added the gesture to click anywhere an remove or retract back the popup
    const handleClick = (e: MouseEvent) => {
      e.target instanceof  HTMLElement &&
      !e.target.closest(".bookmarks-btn") &&
      !e.target.closest(".bookmarks-popover") &&
      LoadStore.setState({openPopUp: false})}
    document.addEventListener('click', handleClick)

    return () => {document.removeEventListener('click', handleClick)}
  }, [])


  return (
    <section>
      <button onClick={(e) =>{setOpenPopUp(); e.preventDefault(); e.stopPropagation()}} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
      {openPopUp && <BookmarksPopover />}
    </section>
  );
}
