"use client";

import type { VenueCard } from "./types";

type LiveVenueCardsProps = {
  venues: VenueCard[];
};

export default function LiveVenueCards({ venues }: LiveVenueCardsProps) {
  return (
    <section className="venue-feed" aria-label="Live venue activity">
      <div className="venue-feed-header">
        <span className="venue-feed-chevron" aria-hidden>
          ◀▶
        </span>
        <h2 className="venue-feed-title font-display">Live Activity</h2>
        <span className="venue-feed-chevron" aria-hidden>
          ◀▶
        </span>
      </div>

      <div className="venue-feed-scroll" role="list">
        {venues.map((venue) => (
          <article key={venue.id} className="venue-card" role="listitem">
            <div className="venue-card-top">
              <span className="venue-card-icon" aria-hidden>
                {venue.icon}
              </span>
              <div className="venue-card-meta">
                <h3 className="venue-card-name font-display">{venue.name}</h3>
                {(venue.rating || venue.distance) && (
                  <p className="venue-card-sub font-body">
                    {venue.rating && <span>{venue.rating}</span>}
                    {venue.rating && venue.distance && <span className="venue-card-dot">·</span>}
                    {venue.distance && <span>{venue.distance}</span>}
                  </p>
                )}
              </div>
              {venue.badge && <span className="venue-card-badge font-body">{venue.badge}</span>}
            </div>
            <p className="venue-card-stat font-body">{venue.stat}</p>
            {venue.detail && <p className="venue-card-detail font-body">{venue.detail}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
