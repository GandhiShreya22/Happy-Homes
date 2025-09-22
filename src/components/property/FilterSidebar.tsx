"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FilterSidebar({ onApply }: { onApply: (filters: any) => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    minSqft: "",
    category: [] as number[],
    amenities: [] as number[],
    minPrice: 0,
    maxPrice: 0,
  });

  // Fetch categories & amenities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, amRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/amenities"),
        ]);
        const catData = await catRes.json();
        const amData = await amRes.json();
        if (catData.success) setCategories(catData.data);
        if (amData.success) setAmenities(amData.data);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchData();
  }, []);

  // Handle checkbox toggle
  const toggleSelection = (field: "category" | "amenities", id: number) => {
    setFilters((prev) => {
      const selected = new Set(prev[field]);
      if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.add(id);
      }
      return { ...prev, [field]: Array.from(selected) };
    });
  };

  // Handle checkbox changes
  // const handleCheckboxChange = (id: number, key: "category" | "amenities") => {
  //   setFilters((prev) => {
  //     const current = prev[key];
  //     return {
  //       ...prev,
  //       [key]: current.includes(id)
  //         ? current.filter((item) => item !== id)
  //         : [...current, id],
  //     };
  //   });
  // };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      minSqft: 0,
      minPrice: 0,
      maxPrice: 0,
      category: [],
      amenities: [],
    });

    onApply({});
  };

  return (
    <div className="filter-sidebar buy-grid-sidebar-item-02 mb-lg-0">
      <div className="filter-head d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Filter</h5>
        <a onClick={resetFilters} className="text-danger">
          Reset
        </a>
      </div>

      <div className="filter-body">
        {/* Search */}
        <div className="filter-set">
          <div
            className="d-flex justify-content-between w-100 filter-search-head"
            data-bs-toggle="collapse"
            data-bs-target="#search"
            aria-expanded="false"
            role="button"
          >
            <h6 className="d-inline-flex align-items-center mb-0">
              <i className="material-icons-outlined me-2 text-secondary">search</i>
              Search
            </h6>
            <i className="material-icons-outlined expand-arrow">expand_less</i>
          </div>
          <div id="search" className="card-collapse collapse show mt-3">
            <div className="mb-3">
              {/* <div className="input-group input-group-flat mb-3">
              <span className="input-group-text border-0">
                <i className="material-icons-outlined">search</i>
              </span> */}
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                className="form-control"
                placeholder="Search by keyword..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label mb-1">Select Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter location"
              />
            </div>
            <div className="mb-3">
              <label className="form-label mb-1">No of Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 3"
                min={0}
              />
            </div>
            <div className="mb-3">
              <label className="form-label mb-1">No of Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 2"
                min={0}
              />
            </div>
            <div className="mb-3">
              <label className="form-label mb-1">Min Sqft</label>
              <input
                type="text"
                name="minSqft"
                value={filters.minSqft}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter sqft..."
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="filter-set mt-3">
          <div
            className="d-flex justify-content-between w-100 filter-search-head"
            data-bs-toggle="collapse"
            data-bs-target="#category"
            aria-expanded="false"
            role="button"
          >
            <h6 className="mb-0 d-flex align-items-center">
              <i className="material-icons-outlined me-2 text-secondary">category</i>
              Categories
            </h6>
            <i className="material-icons-outlined expand-arrow">expand_less</i>
          </div>
          <div id="category" className="card-collapse collapse show mt-3">
            {categories.map((cat) => (
              <div key={cat.id} className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`cat-${cat.id}`}
                  checked={filters.category.includes(cat.id)}
                  onChange={() => toggleSelection("category", cat.id)}
                />
                <label className="form-check-label ms-2" htmlFor={`cat-${cat.id}`}>
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="filter-set mt-3">
          <div
            className="d-flex justify-content-between w-100 filter-search-head"
            data-bs-toggle="collapse"
            data-bs-target="#amenities"
            aria-expanded="false"
            role="button"
          >
            <h6 className="mb-0 d-flex align-items-center">
              <i className="material-icons-outlined me-2 text-secondary">cake</i>
              Amenities
            </h6>
            <i className="material-icons-outlined expand-arrow">expand_less</i>
          </div>
          <div id="amenities" className="card-collapse collapse show mt-3">
            {amenities.map((am) => (
              <div key={am.id} className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`am-${am.id}`}
                  checked={filters.amenities.includes(am.id)}
                  onChange={() => toggleSelection("amenities", am.id)}
                />
                <label className="form-check-label ms-2" htmlFor={`am-${am.id}`}>
                  {am.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="filter-set mt-3">
          <div
            className="d-flex justify-content-between w-100 filter-search-head"
            data-bs-toggle="collapse"
            data-bs-target="#price"
            aria-expanded="false"
            role="button"
          >
            <h6 className="mb-0 d-flex align-items-center">
              <i className="material-icons-outlined me-2 text-secondary">monetization_on</i>
              Price
            </h6>
            <i className="material-icons-outlined expand-arrow">expand_less</i>
          </div>
          <div id="price" className="card-collapse collapse show mt-3">
            <div className="filter-range">
              <div className="d-flex space-between gap-3">
                <div>
                  <label>Min</label>
                  <input
                    type="number"
                    name="minPrice"
                    className="form-control"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Max</label>
                  <input
                    type="number"
                    name="maxPrice"
                    className="form-control"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p className="mb-0">
                Range : <span className="text-dark">INR 200 - INR 5695</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-footer">
        <button
          onClick={() => handleApply}
          className="btn btn-dark w-100"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
