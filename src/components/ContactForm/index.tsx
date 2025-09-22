"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { defaultErrMsg } from "@/src/utils/constants";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  description: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch {
      toast.error(defaultErrMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              {...register("name", {
                required: "Full Name is required"
              })}
              className="form-control"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-danger mt-1">{errors.name.message}</span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
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
            {errors.phone && (
              <span className="text-danger mt-1">{errors.phone.message}</span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple but effective regex
                  message: "Please enter a valid email address",
                },
              })}
              className="form-control"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-danger mt-1">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              {...register("subject", {
                required: "Subject is required"
              })}
              className="form-control"
              placeholder="Enter subject"
            />
            {errors.subject && (
              <span className="text-danger mt-1">{errors.subject.message}</span>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required"
              })}
              className="form-control"
              rows={4}
              placeholder="Write your message"
            ></textarea>
            {errors.description && (
              <span className="text-danger mt-1">{errors.description.message}</span>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <button
            type="submit"
            className="btn btn-lg btn-dark"
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}{" "}
            Submit Enquiry
          </button>
        </div>
      </div>
    </form>
  );
}
