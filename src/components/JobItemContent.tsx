import BookmarkIcon from "./BookmarkIcon";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import {useEffect} from "react";
import Spinner from "./Spinner.tsx";

export default function JobItemContent() {
  const webJoblistId = LoadStore(state => state.webJoblistId)
  const idApiFetching = LoadStore(state => state.idApiFetching)
  const idApiFetchedData = LoadStore(state => state.idApiFetchedData)
  const isApiLoading = LoadStore(state => state.isApiLoading)


  useEffect(() => {
    idApiFetching();
  },[idApiFetching, webJoblistId])


//  return <EmptyJobContent />
  return (
    isApiLoading && <Spinner /> ||
    idApiFetchedData?.daysAgo ?
          <section className="job-details">
            <div>
              <img
                src= {idApiFetchedData?.coverImgURL}
                alt="#"
              />

              <a
                className="apply-btn"
                href= {idApiFetchedData?.companyURL}
                target="_blank"
              >
                Apply
              </a>

              <section className="job-info">
                <div className="job-info__left">
                  <div className="job-info__badge">{idApiFetchedData?.badgeLetters}</div>
                  <div className="job-info__below-badge">
                    <time className="job-info__time">{idApiFetchedData?.daysAgo}d</time>

                    <BookmarkIcon />
                  </div>
                </div>

                <div className="job-info__right">
                  <h2 className="second-heading">{idApiFetchedData?.title}</h2>
                  <p className="job-info__company">{idApiFetchedData?.company}</p>
                  <p className="job-info__description">
                    {idApiFetchedData?.description}
                  </p>
                  <div className="job-info__extras">
                    <p className="job-info__extra">
                      <i className="fa-solid fa-clock job-info__extra-icon"></i>
                      {idApiFetchedData?.duration}
                    </p>
                    <p className="job-info__extra">
                      <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                      {idApiFetchedData?.salary}
                    </p>
                    <p className="job-info__extra">
                      <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                      {idApiFetchedData?.location}
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
                    {idApiFetchedData?.qualifications.map((data,index) => <li key ={index} className="qualifications__item">{data}</li>)}
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
                    {idApiFetchedData?.reviews.map((data, index) => <li key = {index} className="reviews__item">{data}</li>)}
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
