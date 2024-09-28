import BookmarkIcon from "./BookmarkIcon";
import {useEffect, useRef} from "react";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import useSWR from "swr";

export default function JobListItem() {
  const searchText = LoadStore(state => state.searchText);
  const fetchingData = LoadStore(state => state.fetchingData);
  const debouncedSearch = LoadStore(state => state.debouncedSearch)
  const getwebJoblistId = LoadStore(state => state.getwebJoblistId)
  const webJoblistId = LoadStore(state => state.webJoblistId)
  const paginationIndex = LoadStore(state => state.paginationIndex)
  const SortedfetchedData = LoadStore(state => state.SortedfetchedData)

  const debounceTimeOut = useRef<number | null>(null) // 👇🏾

  useEffect(() => {
    debounceTimeOut.current = setTimeout(() => LoadStore.setState({debouncedSearch: searchText}),550) // 600 milisecond
    return () => {if(debounceTimeOut.current) {clearTimeout(debounceTimeOut.current)}} //clear debounce if there
  },[searchText]); // looks like you can have multiple useEffects in one component.

  const {data, isLoading} = useSWR(debouncedSearch, fetchingData, {keepPreviousData: true, revalidateOnFocus: false}) // fetching data

  useEffect(() => {
    LoadStore.setState({firstApiDataCount: data?.length}) // set zustand state out of the store.
    LoadStore.setState({fetchedData: data}) // set zustand state out of the store.
    LoadStore.setState({isLoading: isLoading})
  }, [data, isLoading])


  //🔥 raising events for weblink tracking.
  useEffect(() =>{
    getwebJoblistId(); // calling the event function so it mounts on page reload
    window.addEventListener('hashchange', getwebJoblistId); // adding it to the event
    return () => window.removeEventListener('hashchange', getwebJoblistId)} // removing it from the event, cleaning up event.
    ,[getwebJoblistId])


//  if(isLoading) return <Spinner /> redundant spinnner

  return (
//    to post the id or address on the search bar, include an id href={`# ${data.id}`}
//    to avoid the instant refresh, include a # via string interporation
//      data.id === webJoblistId comparing id and url id.

    <>
      {
        !isLoading && Array.isArray(data) && (SortedfetchedData || data)?.slice(paginationIndex[0],paginationIndex[1]).map(response =>
          <li key={response.id} className={`job-item ${response.id === webJoblistId ? "job-item--active": ""}`}>
            <a href={`# ${response.id}`} className="job-item__link">
              <div className="job-item__badge">{response.badgeLetters}</div>

              <div className="job-item__middle">
                <h3 className="third-heading">{response.title}</h3>
                <p className="job-item__company">{response.company}</p>
              </div>

              <div className="job-item__right">
                <BookmarkIcon response ={response.id}/>
                <time className="job-item__time">{response.daysAgo}d</time>
              </div>
            </a>
          </li>
        )}
    </>
  );

}
