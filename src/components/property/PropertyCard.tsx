import Link from "next/link";
import Image from "next/image";
import { formatAmountToInrCurrency, formatDateToGB } from "@/src/utils/helpers";

interface PropertyCategory {
  id: number;
  name: string;
}

interface Property {
  id: number;
  title: string;
  price: string;
  images: string[];
  userImage: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  created_at: string;
  property_category: PropertyCategory;
  badge?: string;
}

export default function PropertyCard({ property, link = "/property-details" }: { property: Property, link?: string }) {
  const detailPageLink = `${link}/${property.id}`;

  return (
    <div className="col-lg-6 col-md-6 d-flex">
      <div className="property-card flex-fill">
        <div className="property-listing-item p-0 mb-0 shadow-none">
          <div className="buy-grid-img mb-0 rounded-0">
            <Link href={detailPageLink}>
              <Image
                className="img-fluid"
                src={property?.images?.length ? property.images[0]?.image_url : "/assets/img/property/default-property.jpg"}
                alt={property.title}
                width={415}
                height={250}
              />
            </Link>
            {property?.badge && (
              <div className="position-absolute top-0 start-0 m-3 z-1">
                <span className="badge bg-success text-white px-3 py-2">{property.badge}</span>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-between position-absolute bottom-0 end-0 start-0 p-3 z-1">
              <h6 className="text-white mb-0">{formatAmountToInrCurrency(property.price)}</h6>
              {/* <div className="user-avatar avatar avatar-md border rounded-circle">
                <Image src={property.userImage} alt="User" className="rounded-circle" width={40} height={40} />
              </div> */}
            </div>
          </div>
          <div className="buy-grid-content">
            <h6 className="title mb-1">
              <Link href={detailPageLink}>{property.title}</Link>
            </h6>
            <p className="d-flex align-items-center fs-14 mb-0">
              <i className="material-icons-outlined me-1 ms-0">location_on</i>
              {property.location}
            </p>
            <ul className="d-flex buy-grid-details mb-3 bg-light rounded p-3 justify-content-between align-items-center flex-wrap gap-1">
              <li><i className="material-icons-outlined bg-white text-secondary">bed</i>{property.bedrooms} Bedroom</li>
              <li><i className="material-icons-outlined bg-white text-secondary">bathtub</i>{property.bathrooms} Bath</li>
              <li><i className="material-icons-outlined bg-white text-secondary">straighten</i>{property.area_sqft} Sq Ft</li>
            </ul>
            <div className="d-flex justify-content-between flex-wrap gap-1">
              <p>Listed on: {formatDateToGB(property.created_at)}</p>
              <p>Category: {property.property_category.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
