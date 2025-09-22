"use client";

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from "@/src/components/Breadcrumb";
import FilterSidebar from "@/src/components/property/FilterSidebar";
import PropertyCard from "@/src/components/property/PropertyCard";
import TopFilterBar from "@/src/components/property/TopFilterBar";
import { defaultErrMsg } from '@/src/utils/constants';

export default function RentPropertyPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to indicate if more properties are available
  const [page, setPage] = useState(1); // Current page to load more
  const limit = 10; // Properties to fetch at a time
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    fetchProperties(page, filters);
  }, [page, filters]);

  useEffect(() => {
    return () => {
      setProperties([]);
    }
  }, []);


  const fetchProperties = async (pageNum = 1, activeFilters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("type", "rent");
      params.append("page", pageNum.toString());
      params.append("limit", limit.toString());

      if (activeFilters.search) params.append("search", activeFilters.search);
      if (activeFilters.location) params.append("location", activeFilters.location);
      if (activeFilters.bedrooms) params.append("bedrooms", activeFilters.bedrooms);
      if (activeFilters.bathrooms) params.append("bathrooms", activeFilters.bathrooms);
      if (activeFilters.sqft) params.append("sqft", activeFilters.sqft);
      if (activeFilters.priceMin) params.append("priceMin", activeFilters.priceMin);
      if (activeFilters.priceMax) params.append("priceMax", activeFilters.priceMax);

      // Category → only one supported in API (property_catg_id)
      if (activeFilters.category?.length) {
        params.append("property_catg_id", activeFilters.category[0]);
      }

      // Amenities → API expects JSON array
      if (activeFilters.amenities?.length) {
        params.append("amenities", JSON.stringify(activeFilters.amenities));
      }

      const res = await fetch(`/api/active-properties?${params.toString()}`); //nextjs\src\app\api\active-properties\route.ts
      const data = await res.json();

      if (data.success) {
        const propertyData = data?.data?.properties || [];
        if (propertyData && propertyData.length > 0) {
          setProperties((prev) => [...prev, ...propertyData]);
          // If the number of properties returned is less than the limit, there are no more properties to load
          if (propertyData.length < limit) {
            setHasMore(false); // No more properties available
          }
        } else {
          setHasMore(false); // No data returned, stop loading more
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(defaultErrMsg)
    } finally {
      setLoading(false);
    }
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page number to load more properties
    }
  };

  const handleApplyFilters = (appliedFilters: any) => {
    setFilters(appliedFilters);
    setPage(1); // reset to first page
  };

  return (
    <div className="page-wrapper">
      <Breadcrumb title="Rent Properties" />

      <div className="content">
        <div className="container">
          <TopFilterBar />

          <div className="row">
            <div className="col-lg-4 theiaStickySidebar">
            <FilterSidebar onApply={handleApplyFilters} />
            </div>

            <div className="col-lg-8">
              <div className="row mb-4">
                {properties.length ? (
                  properties?.map((p) => (
                    <PropertyCard key={p.id} property={p} link="/property-details" />
                  ))
                ) : (
                  <div className="text-center mt-4">
                    <p>No properties available at the moment.</p>
                  </div>
                )}
              </div>

              {hasMore && properties.length && (
                <div className="text-center">
                  <button className="btn btn-dark d-inline-flex align-items-center" onClick={handleLoadMore} disabled={loading}>
                    {loading && <span className='spinner-border spinner-border-sm me-2'></span>}
                    <i className="material-icons-outlined me-1">autorenew</i>Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}