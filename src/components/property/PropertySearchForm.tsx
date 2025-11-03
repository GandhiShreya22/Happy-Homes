"use client";

import { useState, useEffect } from "react";
import Select from "react-select";

interface PropertySearchFormProps {
  keywords: any[];
  categories: any[];
  keyCatgLoading: boolean;
  onSubmit?: (formData: any) => void;
  type: "buy" | "rent";
}

export default function PropertySearchForm({ keywords, categories, keyCatgLoading, onSubmit, type }: PropertySearchFormProps) {
  const [formData, setFormData] = useState({
    keyword: "",
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    type: type
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("e.target:", formData)
    onSubmit?.(formData);
  };

  return (
    <div className="search-item">
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-bottom flex-wrap flex-lg-nowrap gap-3">
          <div className="flex-fill select-field w-100">
            <label className="form-label">Keyword</label>
            <Select
              options={keywords.map((k) => ({ value: k.id, label: k.name }))}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  keyword: option?.value || "",
                }))
              }
              value={
                keywords.find((k) => k.id === formData.keyword)
                  ? {
                      value: formData.keyword,
                      label: keywords.find((k) => k.id === formData.keyword)
                        ?.name,
                    }
                  : null
              }
              placeholder="Select keyword..."
              classNamePrefix="react-select"
              isLoading={keyCatgLoading}
              menuPortalTarget={mounted ? document.body : null}
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>
          
          <div className="flex-fill select-field w-100">
            <label className="form-label">Property Type</label>
            <Select
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  propertyType: option?.value || "",
                }))
              }
              value={
                categories.find((c) => c.id === formData.propertyType)
                  ? {
                      value: formData.propertyType,
                      label: categories.find((c) => c.id === formData.propertyType)
                        ?.name,
                    }
                  : null
              }
              placeholder="Select type..."
              classNamePrefix="react-select"
              isLoading={keyCatgLoading}
              menuPortalTarget={mounted ? document.body : null}
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>
          
          <div className="flex-fill select-field w-100">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              className="form-control" 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
          </div>
          
          <div className="flex-fill select-field w-100">
            <label className="form-label">Min Price (INR)</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="INR" 
              name="minPrice"
              value={formData.minPrice}
              onChange={handleInputChange}
              min={0}
            />
          </div>

          <div className="flex-fill select-field w-100">
            <label className="form-label">Max Price (INR)</label>
            <input
              type="number"
              className="form-control"
              placeholder="INR"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleInputChange}
              min={0}
            />
          </div>

          <div className="custom-search-item d-flex align-items-end">
            <button type="submit" className="btn btn-primary">
              <i className="material-icons-outlined">search</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
