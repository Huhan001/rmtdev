import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import BookmarkIcon from "./BookmarkIcon";
import useSWR from "swr";
import {SpinnerRun} from "./JobItemContent.tsx";


export default function BookmarksPopover() {
  const fetchedData = LoadStore(state => state.fetchedData)
  const sortedFetched = LoadStore(state => state.SortedfetchedData)
  const bookmarked = LoadStore(state => state.recordedIDs)
  const getRecordedID = LoadStore(state => state.getRecordedID)

  const {data, isLoading} = useSWR(bookmarked.map(data => data.id), getRecordedID,
    {revalidateIfStale: true, revalidateOnReconnect: true, keepPreviousData: true, revalidateOnFocus: true})


    return (
        <div className="bookmarks-popover">
          {isLoading && <SpinnerRun />}
          {
            (sortedFetched || fetchedData || data)?.filter(data => bookmarked.map(data => data.id).includes(data.id))?.map((data,index) =>
              <ul key={index} className="job-list">
                <li key={data.id} className={`job-item`}>
                  <a href={`# ${data.id}`} className="job-item__link">
                    <div className="job-item__badge">{data.badgeLetters}</div>

                    <div className="job-item__middle">
                      <h3 className="third-heading">{data.title}</h3>
                      <p className="job-item__company">{data.company}</p>
                    </div>

                    <div className="job-item__right">
                      <BookmarkIcon response ={data.id}/>
                      <time className="job-item__time">{data.daysAgo}d</time>
                    </div>
                  </a>
                </li>
              </ul>)
          }
    </div>
  );
}

