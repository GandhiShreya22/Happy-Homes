"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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

type PropertyFormValues = {
  title: string;
  slug: string;
  property_catg_id: number;
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
};

export default function AddProperty() {
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
      featured: false,
      status: "ACTIVE",
      amenities: [],
      slug: ""
    },
  });

  const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
  const [amenities, setAmenities] = useState<{ value: number; label: string }[]>([]);

  const titleValue = watch("title"); // watch the title field

  // Fetch existing categories & amenities
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, amenRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/amenities"),
        ]);

        const cats = await catRes.json();
        const amens = await amenRes.json();

        if (cats.success) {
          setCategories(cats.data.map((c: any) => ({ value: c.id, label: c.name })));
        }
        if (amens.success) {
          setAmenities(amens.data.map((a: any) => ({ value: a.id, label: a.name })));
        }
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (propertyId) {
      (async () => {
        try {
          const res = await fetch(`/api/admin/property/${propertyId}`);
          const result = await res.json();
          if (result.success) {
            reset(result.data); // prefill form fields
          } else {
            toast.error("Failed to load property details");
          }
        } catch (err) {
          toast.error(defaultErrMsg);
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

      Object.entries(data).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("images", file); // Append file object to FormData
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
        router.push("/admin/properties");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(defaultErrMsg);
    }
  };

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

            {/* Property Category */}
            <div>
              <Label>
                Property Category <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="property_catg_id"
                control={control}
                rules={{ required: "Property category is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isClearable
                    options={categories}
                    value={categories.find((opt) => opt.value == field.value) || null}
                    onChange={(val) => field.onChange(val ? val.value : null)}
                    onCreateOption={async (inputValue) => {
                      const newOption = await handleCategoryCreate(inputValue);
                      if (newOption) field.onChange(newOption.value);
                    }}
                    classNamePrefix="custom-select"
                  />
                )}
              />
              {errors.property_catg_id && (
                <p className="text-red-500 text-xs">
                  {errors.property_catg_id.message}
                </p>
              )}
            </div>

            {/* Property Type */}
            <div>
              <Label>
                Property Type <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={propertyTypes}
                    onChange={(option) => field.onChange(option?.value)}
                    classNamePrefix="custom-select"
                  />
                )}
              />
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type.message}</p>
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
                    min={0}
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
                Location <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter location of the property"
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
                  required: "Bedrooms are required",
                  min: { value: 0, message: "Min 0" },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter number of available bedrooms"
                    min={0}
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
                  required: "Bathrooms are required",
                  min: { value: 0, message: "Min 0" },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter number of bathrooms"
                    min={0}
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
                  required: "Area is required",
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

          {/* Amenities */}
          <div>
            <Label>Amenities</Label>
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
                />
              )}
            />
            {errors.amenities && (
              <p className="text-red-500 text-xs">{errors.amenities.message}</p>
            )}
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting && <span className="animate-spin"><CircleWhite /></span>} Save
        </button>
      </form>
    </div>
  );
}
