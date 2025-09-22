import { citiesData } from "@/src/data/citiesData";
import CityCard from "./CityCard";

export default function CitiesSection() {
  // Group into pairs (like your original markup: 2 cards per row/slide)
  const groupedCities = [];
  for (let i = 0; i < citiesData.length; i += 2) {
    groupedCities.push(citiesData.slice(i, i + 2));
  }

  return (
    <section className="cities-section section-padding">
      <div className="container">
        {/* Section Title */}
        <div
          className="section-heading aos"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h2 className="mb-2 text-center">Cities/States With Listing</h2>
          <div className="sec-line">
            <span className="sec-line1"></span>
            <span className="sec-line2"></span>
          </div>
          <p className="mb-0 text-center">Destinations we love the most</p>
        </div>

        {/* Cities */}
        <div className="cities-slider">
          {groupedCities.map((group, idx) => (
            <div className="city-items-slide" key={idx}>
              {group.map((city, cityIdx) => (
                <CityCard
                  key={city.id}
                  city={city}
                  aosDelay={cityIdx === 0 ? 1000 : 1500}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
