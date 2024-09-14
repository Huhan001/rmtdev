import JobListItem from "./JobListItem.tsx";
import {LoadStore} from "../GeneralStore.tsx/Store.tsx";
import Spinner from "./Spinner.tsx";

export function JobList() {
  const isLoading = LoadStore(state => state.isLoading)

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      <JobListItem />
    </ul>
  );
}

export default JobList;
