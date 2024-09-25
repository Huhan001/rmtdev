import BookmarkIcon from "./BookmarkIcon";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import Spinner from "./Spinner.tsx";
import useSWR from "swr";
import {webDomain} from "../constant/sharedConstant.tsx";


export default function JobItemContent() {
  const webJoblistId = LoadStore(state => state.webJoblistId)
  const idApiFetching = LoadStore(state => state.idApiFetching)
  const fetchedData = LoadStore(state => state.fetchedData)


  const {data, isLoading} = useSWR( webJoblistId ?`${webDomain}/${webJoblistId}`:null,idApiFetching,
    {keepPreviousData: true,revalidateOnFocus: false})

  if(isLoading) {return <SpinnerRun />} // check the html and css to make sure the components conform to the set style.
  return (
    !!fetchedData && webJoblistId ?
          <section className="job-details">
            <div>
              <img
                src= {data?.coverImgURL}
                alt="#"
              />

              <a
                className="apply-btn"
                href= {data?.companyURL}
                target="_blank"
              >
                Apply
              </a>

              <section className="job-info">
                <div className="job-info__left">
                  <div className="job-info__badge">{data?.badgeLetters}</div>
                  <div className="job-info__below-badge">
                    <time className="job-info__time">{data?.daysAgo}d</time>

                    <BookmarkIcon />
                  </div>
                </div>

                <div className="job-info__right">
                  <h2 className="second-heading">{data?.title}</h2>
                  <p className="job-info__company">{data?.company}</p>
                  <p className="job-info__description">
                    {data?.description}
                  </p>
                  <div className="job-info__extras">
                    <p className="job-info__extra">
                      <i className="fa-solid fa-clock job-info__extra-icon"></i>
                      {data?.duration}
                    </p>
                    <p className="job-info__extra">
                      <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                      {data?.salary}
                    </p>
                    <p className="job-info__extra">
                      <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                      {data?.location}
                    </p>
                  </div>
                </div>
              </section>

              <div className="job-details__other">
                <section className="qualifications">
                  <div className="qualifications__left">
                    <h4 className="fourth-heading">Qualifications</h4>
                    <p className="qualifications__sub-text">
                      Other qualifications may apply
                    </p>
                  </div>
                  <ul className="qualifications__list">
                    {data?.qualifications.map((data,index) => <li key ={index} className="qualifications__item">{data}</li>)}
                    {/*<li className="qualifications__item">React</li>*/}
                    {/*<li className="qualifications__item">Next.js</li>*/}
                    {/*<li className="qualifications__item">Tailwind CSS</li>*/}
                  </ul>
                </section>

                <section className="reviews">
                  <div className="reviews__left">
                    <h4 className="fourth-heading">Company reviews</h4>
                    <p className="reviews__sub-text">
                      Recent things people are saying
                    </p>
                  </div>
                  <ul className="reviews__list">
                    {data?.reviews.map((data, index) => <li key = {index} className="reviews__item">{data}</li>)}
                    {/*<li className="reviews__item">Nice building and food also.</li>*/}
                    {/*<li className="reviews__item">Great working experience.</li>*/}
                  </ul>
                </section>
              </div>

              <footer className="job-details__footer">
                <p className="job-details__footer-text">
                  If possible, please reference that you found the job on{" "}
                  <span className="u-bold">rmtDev</span>, we would really appreciate
                  it!
                </p>
              </footer>
            </div>
          </section>
          : <EmptyJobContent/>

   );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}


const SpinnerRun = () => {
  return (
    <section className= 'job-details'>
      <div>
        <Spinner />
      </div>
    </section>
  )
}