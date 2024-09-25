import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";

export default function BookmarkIcon({response}: {response: number}) {
  const setBookmark = LoadStore(state => state.setbookMarkClick)
  const recordedIDs = LoadStore(state => state.recordedIDs)

  return (
          <button onClick={() => setBookmark(response)} className="bookmark-btn">
            <BookmarkFilledIcon className={`${recordedIDs.find(data => data.id === response && data.bookmark) ? "filled": ""}`} />
          </button>
  );
}
