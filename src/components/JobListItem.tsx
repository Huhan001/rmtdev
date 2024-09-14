import BookmarkIcon from "./BookmarkIcon";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import {useEffect} from "react";

export default function JobListItem() {
  const searchText = LoadStore(state => state.searchText);
  const fetchedData = LoadStore(state => state.fetchedData);
  const fetchingData = LoadStore(state => state.fetchingData);
  const isLoading = LoadStore(state => state.isLoading)
  const getwebJoblistId = LoadStore(state => state.getwebJoblistId)
  const webJoblistId = LoadStore(state => state.webJoblistId)


  useEffect(() =>{fetchingData()},[fetchingData, searchText]); // looks like you can have multiple useEffects in one component.

  useEffect(() =>{
    getwebJoblistId(); // calling the event function so it mounts on page reload
    window.addEventListener('hashchange', getwebJoblistId); // adding it to the event
    return () => window.removeEventListener('hashchange', getwebJoblistId)} // removing it from the event, cleaning up event.
    ,[])


  return (
//    to post the id or address on the search bar, include an id href={`# ${data.id}`}
//    to avoid the instant refresh, include a # via string interporation
//      data.id === webJoblistId comparing id and url id.

    <>
      {
        !isLoading && fetchedData.slice(0,7).map(data =>
        <li key={data.id} className={`job-item ${data.id === webJoblistId ? "job-item--active": ""}`}>
          <a href={`# ${data.id}`} className="job-item__link">
            <div className="job-item__badge">{data.badgeLetters}</div>

            <div className="job-item__middle">
              <h3 className="third-heading">{data.title}</h3>
              <p className="job-item__company">{data.company}</p>
            </div>

            <div className="job-item__right">
              <BookmarkIcon />
              <time className="job-item__time">{data.daysAgo}d</time>
            </div>
          </a>
        </li>
        )}
    </>
  );

}
