interface TopFilterBarProps {
  sortBy?: string;
  priceRange?: string;
  onSortChange?: (sortBy: string) => void;
  onPriceRangeChange?: (priceRange: string) => void;
}

export default function TopFilterBar({ 
  sortBy = "0", 
  priceRange = "",
  onSortChange,
  onPriceRangeChange 
}: TopFilterBarProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSortChange) {
      onSortChange(e.target.value);
    }
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onPriceRangeChange) {
      onPriceRangeChange(e.target.value);
    }
  };

  return (
    <div className="card border-0 search-item mb-4">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Left side - result count */}
          {/* <div className="col-lg-3">
            <p className="mb-4 mb-lg-0 mb-md-3 text-lg-start text-md-start text-center">
              Showing result <span className="result-value">06</span> of
              <span className="result-value">125</span>
            </p>
          </div> */}

          {/* Right side - sort & price */}
          <div className="col-lg-12">
            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-lg-end flex-lg-row flex-md-row flex-column">
              {/* Sort By */}
              <div className="result-list d-flex flex-lg-row flex-md-row flex-column align-items-center gap-2">
                <h5>Sort By</h5>
                <div className="result-select">
                  <select className="select" value={sortBy} onChange={handleSortChange}>
                    <option value="1">A-Z</option>
                    <option value="0">Newest</option>
                    <option value="2">Oldest</option>
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div className="result-list d-flex flex-lg-row flex-md-row flex-column align-items-center gap-2">
                <h5>Price Range</h5>
                <div className="result-select">
                  <select className="select" value={priceRange} onChange={handlePriceRangeChange}>
                    <option value="">None</option>
                    <option value="low-high">Low to High</option>
                    <option value="high-low">High to Low</option>
                  </select>
                </div>
              </div>

              {/* Grid/List/Map icons */}
              {/* <ul className="grid-list-view d-flex align-items-center justify-content-center">
                <li><a href="#" className="list-icon"><i className="material-icons">list</i></a></li>
                <li><a href="#" className="list-icon active"><i className="material-icons">grid_view</i></a></li>
                <li><a href="#" className="list-icon"><i className="material-icons-outlined">location_on</i></a></li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
