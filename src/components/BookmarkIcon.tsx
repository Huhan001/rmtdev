import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";

export default function BookmarkIcon({response}: {response: number}) {
  const setBookmark = LoadStore(state => state.setbookMarkClick)
  const recordedIDs = LoadStore(state => state.recordedIDs)

  return (
          <button onClick={(e) => {setBookmark(response); e.stopPropagation(); e.preventDefault()}} className="bookmark-btn">
            <BookmarkFilledIcon className={`${recordedIDs.find(data => data.id === response && data.bookmark) ? "filled": ""}`} />
          </button>
  );
}

//stop propogation to avoid clicking on the icon and it loads the other conponets near it.
//but at times it occurs that the clicking still affects other components even after stoping propogation
//this is when we use the stop default. this happens that whenever there is a button within a tag that it behaves like this