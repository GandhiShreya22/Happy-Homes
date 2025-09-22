import Link from "next/link";

export default function Breadcrumb({
  title = "Properties List",
}: {
  title?: string;
}) {
  return (
    <div className="breadcrumb-bar">
      <img
        src="/assets/img/bg/breadcrumb-bg-01.png"
        alt=""
        className="breadcrumb-bg-01 d-none d-lg-block"
      />
      <img
        src="/assets/img/bg/breadcrumb-bg-02.png"
        alt=""
        className="breadcrumb-bg-02 d-none d-lg-block"
      />
      <img
        src="/assets/img/bg/breadcrumb-bg-03.png"
        alt=""
        className="breadcrumb-bg-03"
      />
      <div className="row align-items-center text-center position-relative z-1">
        <div className="col-md-12 col-12 breadcrumb-arrow">
          <h1 className="breadcrumb-title">{title}</h1>
          <nav aria-label="breadcrumb" className="page-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <span>
                    <i className="material-icons-outlined me-1">home</i>
                  </span>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
