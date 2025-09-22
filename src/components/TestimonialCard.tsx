import React from "react";
import { Testimonial } from "@/src/data/testimonials";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="testimonials-item aos"
      data-aos={t.aos?.type ?? "fade-down"}
      data-aos-duration={t.aos?.duration ?? 1000}
      role="article"
      aria-label={`Testimonial by ${t.name}`}
    >
      <div className="avatar avatar-lg mb-4">
        <img
          src={t.avatar}
          alt={`${t.name} — avatar`}
          className="img-fluid rounded-circle"
        />
      </div>

      <p className="mb-2">{t.text}</p>
      <h6 className="mb-2">{t.name}</h6>

      <div className="d-flex align-items-center justify-content-center" aria-hidden="true">
        {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
          <i key={i} className="material-icons-outlined text-warning">star</i>
        ))}
      </div>
    </div>
  );
}
