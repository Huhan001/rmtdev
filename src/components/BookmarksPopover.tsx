import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import BookmarkIcon from "./BookmarkIcon";


export default function BookmarksPopover() {
  const fetchedData = LoadStore(state => state.fetchedData)
  const sortedFetched = LoadStore(state => state.SortedfetchedData)
  const bookmarked = LoadStore(state => state.recordedIDs)


    return (
        <div className="bookmarks-popover">

          {
            (sortedFetched || fetchedData)?.filter(data => bookmarked.map(data => data.id).includes(data.id))?.map((data,index) =>
              <ul key={index} className="job-list">
                <li key={data.id} className={`job-item`}>
                  <a className="job-item__link">
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
