"use client";

import { useState } from "react";

interface PropertySearchFormProps {
  keywords: any[];
  categories: any[];
  onSubmit?: (formData: any) => void;
  type: "buy" | "rent";
}

export default function PropertySearchForm({ keywords, categories, onSubmit }: PropertySearchFormProps) {
  const [formData, setFormData] = useState({
    keyword: "",
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ ...formData, type: (PropertySearchForm as any).type });
  };

  return (
    <div className="search-item">
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-bottom flex-wrap flex-lg-nowrap gap-3">
          <div className="flex-fill select-field w-100">
            <label className="form-label">Keyword</label>
            <select 
              className="select" 
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {keywords.map((keyword) => (
                <option key={keyword.id} value={keyword.id}>{keyword.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-fill select-field w-100">
            <label className="form-label">Property Type</label>
            <select 
              className="select" 
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
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
