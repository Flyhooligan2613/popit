"use client";

import type { VenueCard } from "./types";
import { useHorizontalMarquee } from "./useHorizontalMarquee";

type LiveVenueCardsProps = {
  venues: VenueCard[];
  reducedMotion?: boolean;
  energyNorm?: number;
};

function VenueCardItem({ venue }: { venue: VenueCard }) {
  const badgeClass =
    venue.badge === "Hot" || venue.badge === "Trending"
      ? "venue-card-badge is-pulse"
      : venue.badge === "Live"
        ? "venue-card-badge is-live"
        : "venue-card-badge";

  return (
    <article className="venue-card venue-card-mock" role="listitem">
      <div className="venue-card-photo-wrap">
        {venue.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={venue.image} alt="" className="venue-card-photo" loading="lazy" decoding="async" />
        ) : (
          <span className="venue-card-photo-fallback" aria-hidden>
            {venue.icon}
          </span>
        )}
        {venue.badge && <span className={`${badgeClass} font-body venue-card-badge-float`}>{venue.badge}</span>}
      </div>

      <div className="venue-card-body">
        <h3 className="venue-card-name font-display">{venue.name}</h3>
        {(venue.rating || venue.distance) && (
          <p className="venue-card-sub font-body">
            {venue.rating && <span>{venue.rating}</span>}
            {venue.rating && venue.distance && <span className="venue-card-dot">·</span>}
            {venue.distance && <span>{venue.distance}</span>}
          </p>
        )}
        <p className="venue-card-stat font-body">{venue.stat}</p>
        {venue.detail && <p className="venue-card-detail font-body">{venue.detail}</p>}
      </div>
    </article>
  );
}

export default function LiveVenueCards({ venues, reducedMotion = false, energyNorm = 0.5 }: LiveVenueCardsProps) {
  const viewportRef = useHorizontalMarquee({
    speed: reducedMotion ? 0 : 0.5 + energyNorm * 0.3,
    paused: false,
    enabled: !reducedMotion && venues.length > 1,
  });

  const loop = [...venues, ...venues];

  return (
    <section className="venue-feed venue-feed-mock" aria-label="Live venue activity">
      <div className="venue-feed-header">
        <span className="venue-feed-live-dot" aria-hidden />
        <h2 className="venue-feed-title font-display">Live Activity</h2>
      </div>

      <div ref={viewportRef} className="venue-feed-scroll" role="list">
        {loop.map((venue, i) => (
          <VenueCardItem key={`${venue.id}-${i}`} venue={venue} />
        ))}
      </div>
    </section>
  );
}
