"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import ComponentCard from "@/src/components/admin/common/ComponentCard";
import PageBreadcrumb from "@/src/components/admin/common/PageBreadCrumb";
import Input from "@/src/components/form-elements/InputField";
import Label from "@/src/components/form-elements/Label";
import TextArea from "@/src/components/form-elements/TextArea";
import Checkbox from "@/src/components/form-elements/Checkbox";
import DropzoneComponent from "@/src/components/admin/Dropzone";
import { defaultErrMsg, propertyTypes } from "@/src/utils/constants";
import { CircleWhite } from "@/src/assets/icons";
import { usePropertyData } from "@/src/hooks/usePropertyData";

type PropertyFormValues = {
  title: string;
  slug: string;
  property_catg_id: number | null;
  type: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  description: string;
  featured: boolean;
  status: string;
  amenities: number[];
  images: File[];
  keyword: number | null;
};

function AddProperty() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<PropertyFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      property_catg_id: null,
      type: "",
      price: 0,
      location: "",
      address: "",
      bedrooms: 0,
      bathrooms: 0,
      area_sqft: 0,
      description: "",
      featured: false,
      status: "ACTIVE",
      amenities: [],
      images: [],
      keyword: null,
    },
  });

  const { keywords: initKeywords, categories: initCatg, amenities: initAmenities, loading, error } = usePropertyData();

  const [loadProperty, setLoadProperty] = useState(false);
  const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
  const [amenities, setAmenities] = useState<{ value: number; label: string }[]>([]);
  const [keywords, setKeywords] = useState<{ value: number; label: string }[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const titleValue = watch("title"); // watch the title field

  // Fetch existing categories & amenities
  useEffect(() => {
    if (initAmenities?.length) {
      setAmenities(initAmenities.map((a: any) => ({ value: a.id, label: a.name })));
    }
    if (initKeywords?.length) {
      setKeywords(initKeywords.map((k: any) => ({ value: k.id, label: k.name })))
    }
    if (initCatg?.length) {
      setCategories(initCatg.map((c: any) => ({ value: c.id, label: c.name })));
    }
    if (error) {
      toast.error(error);
    }
  }, [initAmenities, initCatg, initKeywords, error]);

  useEffect(() => {
    if (propertyId) {
      (async () => {
        try {
          setLoadProperty(true);
          const res = await fetch(`/api/property/${propertyId}`);
          const result = await res.json();
          if (result.success) {
            const property = result.data;

            // Extract amenity IDs safely (for multi-select prefill)
            let amenityIds: number[] = [];
            if (Array.isArray(property.amenitiesObj)) {
              amenityIds = property.amenitiesObj.map(
                (item: any) => item?.amenity?.id
              );
            }

            setExistingImages(property.images || []); // prefill existing image URLs

            // Reset form with merged values
            reset({
              ...property,
              amenities: amenityIds, // override with IDs for react-select
            });
            setLoadProperty(false);
          } else {
            toast.error("Failed to load property details");
            setLoadProperty(false);
          }
        } catch (err) {
          toast.error(defaultErrMsg);
          setLoadProperty(false);
        }
      })();
    }
  }, [propertyId, reset]);

  // Create new category inline
  const handleCategoryCreate = async (name: string) => {
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const result = await res.json();
      if (result.success) {
        const newOption = { value: result.data.id, label: result.data.name };
        setCategories((prev) => [...prev, newOption]);
        toast.success(result.message);
        return newOption;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(defaultErrMsg);
    }
  };

  // Create new category inline
  const handleAmenityCreate = async (name: string) => {
    try {
      const res = await fetch("/api/admin/amenities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const result = await res.json();
      if (result.success) {
        const newOption = { value: result.data.id, label: result.data.name };
        setAmenities((prev) => [...prev, newOption]);
        toast.success(result.message);
        return newOption;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(defaultErrMsg);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // replace spaces and invalid chars with dash
      .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
  };

  // auto-update slug whenever title changes
  useEffect(() => {
    if (titleValue) {
      const newSlug = generateSlug(titleValue);
      setValue("slug", newSlug, { shouldValidate: true });
    }
  }, [titleValue, setValue]);

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      const formData = new FormData();

      if (removedImages.length) {
        formData.append("removedImages", JSON.stringify(removedImages));
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("images", file as File); // Append file object to FormData
          });
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      const res = await fetch(
        propertyId ? `/api/admin/property/${propertyId}` : "/api/admin/property",
        {
          method: propertyId ? "PUT" : "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success(result.message || "Property added successfully!");
        reset();
        router.replace("/admin/properties");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(defaultErrMsg);
    }
  };

  if (loadProperty) return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading property details...</div>;

  return (
    <div>
      <PageBreadcrumb
        pageTitle={`${propertyId ? "Edit" : "Add"} Property`}
        links={[
          { title: "Properties", path: "/admin/properties" },
          { title: propertyId ? "Edit Property" : "Add Property" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="off">
        <ComponentCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <Label>
                Title <span className="text-red-500">*</span>
              </Label>
              <Controller
                control={control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter property title"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <Label>
                Slug <span className="text-red-500">*</span>
              </Label>
              <Controller
                control={control}
                name="slug"
                rules={{ required: "Slug is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Auto-generated from title"
                  />
                )}
              />
              {errors.slug && (
                <p className="text-red-500 text-xs">{errors.slug.message}</p>
              )}
            </div>

            {/* Property Type */}
            <div>
              <Label>
                Purpose <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Purpose is required" }}
                render={({ field }) => (
                  <Select
                    options={propertyTypes}
                    value={propertyTypes.find((opt) => opt.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value || "")}
                    classNamePrefix="custom-select"
                    placeholder="Select Purpose..."
                  />
                )}
              />
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type.message}</p>
              )}
            </div>

            {/* Property Category */}
            <div>
              <Label>
                Property Type <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="property_catg_id"
                control={control}
                rules={{ required: "Property type is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isClearable
                    isLoading={loading}
                    options={categories}
                    value={categories.find((opt) => opt.value == field.value) || null}
                    onChange={(val) => field.onChange(val ? val.value : null)}
                    onCreateOption={async (inputValue) => {
                      const newOption = await handleCategoryCreate(inputValue);
                      if (newOption) field.onChange(newOption.value);
                    }}
                    classNamePrefix="custom-select"
                    placeholder="Select or create a property type..."
                  />
                )}
              />
              {errors.property_catg_id && (
                <p className="text-red-500 text-xs">
                  {errors.property_catg_id.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label>
                Price <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Price is required",
                  min: { value: 0, message: "Price must be >= 0" },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    min="0"
                    step={0.01}
                    placeholder="Enter price of the property"
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label>
                Location (City/Town) <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location(City/Town) is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter location(City/Town) of the property"
                  />
                )}
              />
              {errors.location && (
                <p className="text-red-500 text-xs">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <Label>
              Address <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={3}
                  placeholder="Enter detailed address"
                />
              )}
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>

          {/* Bedrooms / Bathrooms / Area */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Bedrooms</Label>
              <Controller
                name="bedrooms"
                control={control}
                rules={{
                  // required: "Bedrooms are required",
                  min: { value: 0, message: "Min 0" },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter number of available bedrooms"
                    min="0"
                  />
                )}
              />
              {errors.bedrooms && (
                <p className="text-red-500 text-xs">
                  {errors.bedrooms.message}
                </p>
              )}
            </div>
            <div>
              <Label>Bathrooms</Label>
              <Controller
                name="bathrooms"
                control={control}
                rules={{
                  // required: "Bathrooms are required",
                  min: { value: 0, message: "Min 0" },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter number of bathrooms"
                    min="0"
                  />
                )}
              />
              {errors.bathrooms && (
                <p className="text-red-500 text-xs">
                  {errors.bathrooms.message}
                </p>
              )}
            </div>
            <div>
              <Label>Area (sqft)</Label>
              <Controller
                name="area_sqft"
                control={control}
                rules={{
                  // required: "Area is required",
                  min: { value: 0, message: "Min 0" },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter area (sqft)"
                  />
                )}
              />
              {errors.area_sqft && (
                <p className="text-red-500 text-xs">
                  {errors.area_sqft.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={4}
                  placeholder="Write short decription about your property"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Keyword */}
            <div>
              <Label>
                Keyword
              </Label>
              <Controller
                name="keyword"
                control={control}
                // rules={{ required: "Property keyword is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    isLoading={loading}
                    options={keywords}
                    value={keywords.find((opt) => opt.value == field.value) || null}
                    onChange={(val) => field.onChange(val ? val.value : null)}
                    classNamePrefix="custom-select"
                    placeholder="Select Keyword..."
                  />
                )}
              />
              {errors.keyword && (
                <p className="text-red-500 text-xs">
                  {errors.keyword.message}
                </p>
              )}
            </div>

          {/* Amenities */}
          <div>
            <Label>Amenities <span className="text-red-500">*</span></Label>
            <Controller
              name="amenities"
              control={control}
              rules={{ required: "Please select at least one amenity" }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  classNamePrefix="custom-select"
                  isClearable
                  isMulti
                  isLoading={loading}
                  options={amenities}
                  value={amenities.filter((opt) =>
                    field.value?.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    field.onChange(selected.map((s) => s.value))
                  }
                  onCreateOption={async (inputValue) => {
                    const newOption = await handleAmenityCreate(inputValue);
                    if (newOption) {
                      field.onChange([
                        ...(field.value || []),
                        newOption.value,
                      ]);
                    }
                  }}
                  placeholder="Select or create a amenities..."
                />
              )}
            />
            {errors.amenities && (
              <p className="text-red-500 text-xs">{errors.amenities.message}</p>
            )}
          </div>
          </div>

          {/* Images */}
          <div>
            <Label>Property Images</Label>
            <Controller
              name="images"
              control={control}
              // rules={{ required: "At least one image is required" }}
              render={({ field }) => (
                <DropzoneComponent
                  onDrop={(files) => field.onChange(files)}
                  maxFiles={6}
                  accept={{
                    "image/png": [],
                    "image/jpeg": [],
                    "image/webp": [],
                  }}
                  // for edit mode
                  existingImages={existingImages}
                  onRemoveExisting={(url) => {
                    setRemovedImages((prev) => [...prev, url]);
                  }}
                />
              )}
            />
            {errors.images && (
              <p className="text-red-500 text-xs">{errors.images.message}</p>
            )}
          </div>

          {/* Featured */}
          <div>
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    label="Featured"
                  />
                </>
              )}
            />
          </div>

          {/* Status */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value === "ACTIVE"}
                onChange={(checked) =>
                  field.onChange(checked ? "ACTIVE" : "INACTIVE")
                }
                label="Publish"
              />
            )}
          />
        </ComponentCard>

        {/* Submit button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="animate-spin">
              <CircleWhite />
            </span>
          )}
          Save
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProperty />
    </Suspense>
  );
}