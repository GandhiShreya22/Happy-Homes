"use client";

import { use, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { defaultErrMsg } from "@/src/utils/constants";
import { formatAmountToInrCurrency, formatDateToGB } from "@/src/utils/helpers";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message?: string;
};

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [propertyData, setPropertyData] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    title,
    slug,
    property_category,
    type: propertyType,
    price,
    location,
    address,
    bedrooms,
    bathrooms,
    area_sqft,
    description,
    featured,
    status,
    admin_id,
    amenities,
    created_at,
    images,
  } = propertyData || {};

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  useEffect(() => {
    if (id) {
      fetchProperty(id); // Fetch property details when `id` is available
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/property/${propertyId}`); // API call to fetch property by `id`
      const data = await res.json();

      if (data.success) {
        setPropertyData(data?.data || null); // Assuming the API returns property details
      } else {
        toast.error(data.message); // Show error message if API call fails
      }
    } catch (error) {
      toast.error(defaultErrMsg); // Default error message in case of an issue
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const mainSliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const thumbSliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: id, // replace with real property_id
          ...data,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || "Submission failed");
      }
    } catch (err) {
      toast.error(defaultErrMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!propertyData) {
    return <div className="text-center">Property not found.</div>; // Show this if no property data is available
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="buy-details-header-item">
        <div className="breadcrumb-bar custom-breadcrumb-bar">
          <div className="container">
            <div className="row align-items-center text-center position-relative z-1">
              <div className="col-xl-8">
                <div className="d-flex align-center gap-2 mb-2">
                  <span className="badge bg-secondary">For {propertyType}</span>
                </div>
                <h1 className="breadcrumb-title text-start">{title}</h1>
                <div className="d-flex align-items-center gap-2 flex-wrap gap-1 mb-xl-0 mb-4">
                  <div className="fs-14 mb-0 text-white d-flex align-items-center flex-wrap gap-1 custom-address-item">
                    <i className="material-icons-outlined text-white me-1">location_on</i>{location}
                    {/* {" "}<a href="#" target="_blank" className="text-primary fs-14 text-decoration-underline ms-1"> View Location</a> */}
                  </div>
                  <p className="fs-14 mb-0 text-white">Posted on : {formatDateToGB(created_at)}</p>
                </div>
              </div>
              <div className="col-xl-4 d-flex d-xl-block align-items-center flex-wrap gap-3">
                <h4 className="mb-0 text-primary text-xl-end text-start"> {formatAmountToInrCurrency(price)} </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Left Side */}
            <div className="col-xl-8">
              {/* Badges */}
              <div className="mb-4 d-inline-flex align-center justify-content-between w-100 flex-wrap gap-1">
                <div className="d-inline-flex align-center gap-2">
                  {propertyData?.badge && (
                    <span className="badge bg-orange d-flex align-items-center">
                      <i className="material-icons-outlined  fs-14 me-1">loyalty</i> {propertyData?.badge}
                    </span>
                  )}
                </div>
                {/* <p className="mb-0 text-dark">Total No of Visits : 45</p> */}
              </div>

              {/* Slider */}
              <div className="slider-card service-slider-card mb-4">
                <div className="slide-part mb-4">
                  <Slider {...mainSliderSettings}>
                    {images.map((img, n) => (
                      <div key={`img${n}`} className="service-img-wrap">
                        <Image
                          src={img}
                          alt="Slider Img"
                          className="img-fluid"
                          width={800}
                          height={500}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <Slider {...thumbSliderSettings}>
                  {images.map((img, n) => (
                    <div key={`img-slide${n}`} className="slide-img">
                      <Image
                        src={img}
                        alt="Thumb Img"
                        className="img-fluid"
                        width={200}
                        height={120}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Accordion */}
              <div className="accordion accordions-items-seperate">
                {/* Description */}
                {description && description != "undefined" && (
                  <div className="accordion-item">
                    <div
                      className="accordion-header cursor-pointer"
                      onClick={() => toggleAccordion("description")}
                    >
                      <button className="accordion-button" type="button">
                        Description
                      </button>
                    </div>
                    {openAccordion === "description" && (
                      <div id="accordion-1" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                          <p>{description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                {propertyData?.features && (
                  <div className="accordion-item">
                    <div
                      className="accordion-header cursor-pointer"
                      onClick={() => toggleAccordion("features")}
                    >
                      <button className="accordion-button" type="button">
                        Features
                      </button>
                    </div>
                    {openAccordion === "features" && (
                      <div className="accordion-collapse show">
                        <div className="accordion-body">
                          {/* <ul>
                            <li>3 Bedrooms</li>
                            <li>2 Bathrooms</li>
                            <li>Swimming Pool</li>
                            <li>Garden Area</li>
                            <li>Parking Space</li>
                          </ul> */}
                          <div className="row row-gap-4">
                            <div className="col-lg-3 col-md-6">
                              <div className="buy-property-items">
                                <p> <i className="material-icons-outlined">bed</i>  Bedrooms: 3</p>
                                <p> <i className="material-icons-outlined">door_sliding</i> Floor: 5th of 12 </p>
                                <p> <i className="material-icons-outlined">microwave</i>  Microwave : 2  </p>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="buy-property-items">
                                <p> <i className="material-icons-outlined">bathtub</i>  Bathrooms: 2</p>
                                <p> <i className="material-icons-outlined">bento</i>  Wardrobe :1 </p>
                                <p className="mb-lg-0"> <i className="material-icons-outlined">ac_unit</i> AC : 4 </p>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="buy-property-items">
                                <p> <i className="material-icons-outlined">directions_car_filled</i>  Parking: 1</p>
                                <p> <i className="material-icons-outlined">tv</i> TV : 4 </p>
                                <p className="mb-lg-0"> <i className="material-icons-outlined">kitchen</i>Fridge : 1  </p>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                              <div className="buy-property-items">
                                <p> <i className="material-icons-outlined">corporate_fare</i> Balcony: Yes</p>
                                <p> <i className="material-icons-outlined">water</i>  Water Purifier : 2</p>
                                <p className="mb-lg-0 mb-0"> <i className="material-icons-outlined">checkroom</i>  Curtains : yes </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Amenities */}
                <div className="accordion-item">
                  <div
                    className="accordion-header cursor-pointer"
                    onClick={() => toggleAccordion("amenities")}
                  >
                    <button className="accordion-button" type="button">
                      Amenities
                    </button>
                  </div>
                  {openAccordion === "amenities" && (
                    <div className="accordion-collapse show">
                      <div className="accordion-body">
                        <div className="row row-gap-4">
                          {amenities?.map((item, i) => (
                            <div className="col-lg-3 col-md-6" key={`col-item-${i}`}>
                              <div className="buy-property-items">
                                <p key={i}>
                                  <i className="material-icons-outlined">
                                    radio_button_checked
                                  </i>
                                  {item}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location  */}
                {/* <div className="accordion-item">
                  <div
                    className="accordion-header cursor-pointer"
                    onClick={() => toggleAccordion("location")}
                  >
                    <button className="accordion-button" type="button">
                      Location
                    </button>
                  </div>
                  {openAccordion === "location" && (
                    <div className="accordion-collapse show">
                      <div className="accordion-body">
                        <div style={{ width: "100%", height: "300px" }}>
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!..."
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}
                </div> */}

                {/* Reviews */}
                <div className="accordion-item">
                  <div
                    className="accordion-header cursor-pointer"
                    onClick={() => toggleAccordion("reviews")}
                  >
                    <button className="accordion-button" type="button">
                      Reviews
                    </button>
                  </div>
                  {openAccordion === "reviews" && (
                    <div className="accordion-collapse show">
                      <div className="accordion-body">
                        <div className="mb-3 border-bottom pb-2">
                          <strong>John Doe</strong>
                          <p>Great property, amazing location!</p>
                        </div>
                        <div className="mb-3 border-bottom pb-2">
                          <strong>Sarah Smith</strong>
                          <p>Loved the garden area and peaceful neighborhood.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="col-xl-4 theiaStickySidebar buy-details-item">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Enquiry</h5>
                </div>
                <div className="card-body">
                  {/* <div className="card bg-light border-0 rounded shadow-none custom-btn">
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar avatar-lg">
                          <img src="/assets/img/users/user-06.jpg" alt="" className="rounded-circle" />
                        </div>
                        <div>
                          <h6 className="mb-1 fs-16 fw-semibold">Adrian Hendriques</h6>
                          <p className="mb-0 fs-14 text-body"> Company Agent </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Name <span className="test-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <small className="text-danger">{errors.name.message}</small>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email <span className="test-danger">*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && <small className="text-danger">{errors.email.message}</small>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Phone <span className="test-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text">+91</span>
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/, // exactly 10 digits for Indian phone numbers
                              message: "Please enter a valid 10-digit phone number",
                            },
                          })}
                          className="form-control"
                          placeholder="Enter your phone number"
                          maxLength={10}
                        />
                      </div>
                      {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Write here..."
                        {...register("message")}
                      ></textarea>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-dark w-100 py-2 fs-14" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm me-2"></span>} Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
