import { Property } from "@/src/data/featuredProperties.js";
import { formatAmountToInrCurrency, formatDateToGB } from "@/src/utils/helpers";
import Image from "next/image";
import Link from "next/link";

interface Props {
  property: Property;
  link: string,
}

export default function PropertyCard({ property, link = "/property-details" }: Props) {
  const detailPageLink = `${link}/${property.id}`;

  return (
    <div className="property-card flex-fill mb-0">
      <div className="property-listing-item p-0 mb-0 shadow-none">
        <div className="buy-grid-img mb-0 rounded-0 position-relative">
          <Link href={detailPageLink}>
            <Image
              // className="img-fluid"
              src={property?.images?.length ? property.images[0]?.image_url : "/assets/img/property/default-property.jpg"}
              alt={property.title}
              width={415}
              height={250}
            />
          </Link>

          {property.badge && (
            <div className="position-absolute top-0 start-0 m-3 z-1">
              <span className="badge bg-success text-white px-3 py-2">{property.badge}</span>
            </div>
          )}

          <div className="d-flex align-items-center justify-content-end position-absolute bottom-0 end-0 start-0 p-3 z-1">
            <h6 className="text-white mb-0">{formatAmountToInrCurrency(property.price)}</h6>
          </div>
        </div>

        <div className="buy-grid-content">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h6 className="title mb-1">
                <a href={property.link} className="cursor-pointer">{property.title}</a>
              </h6>
              <p className="d-flex align-items-center fs-14 mb-0">
                <i className="material-icons-outlined me-1 ms-0">location_on</i>
                {property.location}
              </p>
            </div>
          </div>

          <ul className="d-flex buy-grid-details mb-3 bg-light rounded p-3 justify-content-between align-items-center flex-wrap gap-1">
            <li className="d-flex align-items-center gap-1">
              <i className="material-icons-outlined bg-white text-secondary">bed</i>
              {property.bedrooms} Bedroom
            </li>
            <li className="d-flex align-items-center gap-1">
              <i className="material-icons-outlined bg-white text-secondary">bathtub</i>
              {property.bathrooms} Bath
            </li>
            <li className="d-flex align-items-center gap-1">
              <i className="material-icons-outlined bg-white text-secondary">straighten</i>
              {property.area_sqft} Sq Ft
            </li>
          </ul>

          <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
            <p className="fs-14 fw-medium text-dark mb-0">
              Listed on : <span className="fw-medium text-body"> {formatDateToGB(property.created_at)}</span>
            </p>
            <p className="fs-14 fw-medium text-dark mb-0">
              Category : <span className="fw-medium text-body"> {property.property_category?.name}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};