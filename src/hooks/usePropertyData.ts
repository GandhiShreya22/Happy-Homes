import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PropertyData {
  keywords: any[];
  categories: any[];
  amenities: any[];
  loading: boolean;
  error: string | null;
}

export function usePropertyData(): PropertyData {
  const [keywords, setKeywords] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both keywords, categories and amenities in parallel
        const [keywordsRes, categoriesRes, amenitiesRes] = await Promise.all([
          fetch("/api/keywords"),
          fetch("/api/categories"),
          fetch("/api/amenities")
        ]);

        const [keywordsData, categoriesData, amenitiesData] = await Promise.all([
          keywordsRes.json(),
          categoriesRes.json(),
          amenitiesRes.json()
        ]);

        if (keywordsData.success) {
          setKeywords(keywordsData.data);
        } else {
          toast.error(keywordsData.message);
          setError(keywordsData.message);
        }

        if (categoriesData.success) {
          setCategories(categoriesData.data);
        } else {
          toast.error(categoriesData.message);
          setError(categoriesData.message);
        }

        if (amenitiesData.success) {
          setAmenities(amenitiesData.data);
        } else {
          toast.error(amenitiesData.message);
          setError(amenitiesData.message);
        }
      } catch (err) {
        const errorMessage = "Failed to fetch property data";
        toast.error(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { keywords, categories, amenities, loading, error };
}
