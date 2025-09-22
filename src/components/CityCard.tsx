import Link from "next/link";
import { City } from "@/src/data/citiesData";

interface CityCardProps {
  city: City;
  aosDelay?: number;
}

export default function CityCard({ city, aosDelay = 1000 }: CityCardProps) {
  return (
    <div
      className="city-item position-relative mb-4 aos"
      data-aos="fade-down"
      data-aos-duration={aosDelay}
    >
      <div className="city-img position-relative">
        <img src={city.img} alt={`${city.name} city`} className="img-fluid" />
      </div>
      <div className="city-name">
        <h5 className="mb-1">{city.name}</h5>
        <p className="mb-0">{city.properties}</p>
      </div>
      <div className="arrow-overlay">
        <Link href={city.link} aria-label={`View properties in ${city.name}`}>
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
}
