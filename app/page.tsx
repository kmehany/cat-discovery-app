
import Link from "next/link";
import "./discover.css";


export default function Home() {
  return (
    <div className="page">
      <div className="home-card">
        <h1 className="title">Welcome to the Cat Explore Planet</h1>

        <p className="subtitle">
          Explore random cats, view their attributes, and ban traits you do not want to see again.
        </p>

        <div className="home-button-group">
          <Link href="/discover" className="home-btn">
            Go to Discover Page
          </Link>


        </div>
      </div>
    </div>
  );
}
