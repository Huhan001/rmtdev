import Sidebar from "./Sidebar.tsx";
import JobItemContent from "./JobItemContent.tsx";

export default function Container() {

  return (
    <div className="container">
      <Sidebar />
      <JobItemContent />
    </div>
    );
}
