"use client";

import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from "@/src/components/Breadcrumb";
import FilterSidebar from "@/src/components/property/FilterSidebar";
import PropertyCard from "@/src/components/property/PropertyCard";
import TopFilterBar from "@/src/components/property/TopFilterBar";
import { defaultErrMsg } from '@/src/utils/constants';

interface PropertyFilters {
  search?: string;
  location?: string;
  bedrooms?: string;
  bathrooms?: string;
  minSqft?: string;
  minPrice?: string;
  maxPrice?: string;
  keyword?: string;
  category?: number[];
  amenities?: number[];
}

interface PropertyCategory {
  id: number;
  name: string;
}

interface PropertyImage {
  image_url: string;
  [key: string]: unknown;
}

interface Property {
  id: number;
  title: string;
  price: string;
  images: PropertyImage[];
  userImage: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  created_at: string;
  property_category: PropertyCategory;
  badge?: string;
  [key: string]: unknown;
}

export default function RentPropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to indicate if more properties are available
  const [page, setPage] = useState(1); // Current page to load more
  const limit = 10; // Properties to fetch at a time
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [sortBy, setSortBy] = useState("0");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    return () => {
      setProperties([]);
    }
  }, []);

  const fetchProperties = useCallback(async (pageNum = 1, activeFilters: PropertyFilters = {}) => {
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
      if (activeFilters.minSqft) params.append("minSqft", activeFilters.minSqft);
      if (activeFilters.minPrice) params.append("minPrice", activeFilters.minPrice);
      if (activeFilters.maxPrice) params.append("maxPrice", activeFilters.maxPrice);

      // Keyword filter - single keyword ID
      if (activeFilters.keyword) params.append("keyword", activeFilters.keyword);

      // Category → API expects JSON array for property_catg_ids
      if (activeFilters.category?.length) {
        params.append("property_catg_ids", JSON.stringify(activeFilters.category));
      }

      // Amenities → API expects JSON array
      if (activeFilters.amenities?.length) {
        params.append("amenities", JSON.stringify(activeFilters.amenities));
      }

      // Sort parameters
      if (sortBy) params.append("sortBy", sortBy);
      if (priceRange) params.append("priceRange", priceRange);

      console.log("params:", params.toString());

      const res = await fetch(`/api/active-properties?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        const propertyData = data?.data?.properties || [];
        if (propertyData && propertyData.length > 0) {
          // If page is 1, replace properties; otherwise append (for load more)
          if (pageNum === 1) {
            setProperties(propertyData);
          } else {
            setProperties((prev) => [...prev, ...propertyData]);
          }
          // If the number of properties returned is less than the limit, there are no more properties to load
          if (propertyData.length < limit) {
            setHasMore(false); // No more properties available
          } else {
            setHasMore(true); // More properties available
          }
        } else {
          if (pageNum === 1) {
            setProperties([]);
          }
          setHasMore(false); // No data returned, stop loading more
        }
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error(defaultErrMsg)
    } finally {
      setLoading(false);
    }
  }, [sortBy, priceRange, limit]);

  useEffect(() => {
    fetchProperties(page, filters);
  }, [page, filters, fetchProperties]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page number to load more properties
    }
  };

  const handleApplyFilters = (appliedFilters: PropertyFilters) => {
    setFilters(appliedFilters);
    setPage(1); // reset to first page
    setProperties([]); // clear existing properties
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPage(1); // reset to first page
    setProperties([]); // clear existing properties
  };

  const handlePriceRangeChange = (newPriceRange: string) => {
    setPriceRange(newPriceRange);
    setPage(1); // reset to first page
    setProperties([]); // clear existing properties
  };

  return (
    <div className="page-wrapper">
      <Breadcrumb title="Rent Properties" />

      <div className="content">
        <div className="container">
          <TopFilterBar 
            sortBy={sortBy}
            priceRange={priceRange}
            onSortChange={handleSortChange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          <div className="row">
            <div className="col-lg-4 theiaStickySidebar">
            <FilterSidebar onApply={handleApplyFilters} />
            </div>

            <div className="col-lg-8">
              <div className="row mb-4">
                {properties?.length ? (
                  properties?.map((p) => (
                    <PropertyCard key={p.id} property={p as any} link="/property-details" />
                  ))
                ) : (
                  loading ? (
                    <div className="text-center mt-4">
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      <span>Loading properties...</span>
                    </div>
                  ) : (
                  <div className="text-center mt-4">
                    <p>No properties available at the moment.</p>
                  </div>
                  )
                )}
              </div>

              {hasMore && properties.length > 0 && (
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