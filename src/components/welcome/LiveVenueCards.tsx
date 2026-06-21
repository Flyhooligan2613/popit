"use client";

import type { VenueCard } from "./types";
import { useHorizontalMarquee } from "./useHorizontalMarquee";
import ReliableImage from "./ReliableImage";

type LiveVenueCardsProps = {
  venues: VenueCard[];
  reducedMotion?: boolean;
  energyNorm?: number;
  onVenueClick?: (venue: VenueCard) => void;
  onSectionClick?: () => void;
};

function VenueCardItem({ venue, onClick }: { venue: VenueCard; onClick?: () => void }) {
  const badgeClass =
    venue.badge === "Hot" || venue.badge === "Trending"
      ? "venue-card-badge is-pulse"
      : venue.badge === "Live"
        ? "venue-card-badge is-live"
        : "venue-card-badge";

  return (
    <button type="button" className="venue-card venue-card-mock popit-tap-target" role="listitem" onClick={onClick}>
      <div className="venue-card-photo-wrap">
        {venue.image ? (
          <ReliableImage
            src={venue.image}
            className="venue-card-photo"
            fallbackClassName="venue-card-photo-fallback"
            fallbackIcon={venue.icon}
          />
        ) : (
          <span className="venue-card-photo-fallback" aria-hidden>
            {venue.icon}
          </span>
        )}
        {venue.badge && <span className={`${badgeClass} font-body venue-card-badge-float`}>{venue.badge}</span>}
      </div>

      <div className="venue-card-body">
        <div className="venue-card-name-row">
          <span className="venue-card-icon-inline" aria-hidden>
            {venue.icon}
          </span>
          <h3 className="venue-card-name font-display">{venue.name}</h3>
        </div>
        {(venue.rating || venue.distance) && (
          <p className="venue-card-sub font-body">
            {venue.rating && <span>{venue.rating}</span>}
            {venue.rating && venue.distance && <span className="venue-card-dot">·</span>}
            {venue.distance && <span>{venue.distance}</span>}
          </p>
        )}
        <p className="venue-card-stat font-body">{venue.stat}</p>
        {venue.detail && <p className="venue-card-detail font-body">{venue.detail}</p>}
        {venue.updatedMin != null && (
          <p className="venue-card-updated font-body">Updated {venue.updatedMin} min ago</p>
        )}
      </div>
    </button>
  );
}

export default function LiveVenueCards({
  venues,
  reducedMotion = false,
  energyNorm = 0.5,
  onVenueClick,
  onSectionClick,
}: LiveVenueCardsProps) {
  const viewportRef = useHorizontalMarquee({
    speed: reducedMotion ? 0 : 0.35 + energyNorm * 0.25,
    paused: false,
    enabled: !reducedMotion && venues.length > 1,
  });

  const loop = [...venues, ...venues];

  return (
    <section className="venue-feed venue-feed-mock venue-feed-polish" aria-label="Live venue activity">
      <button type="button" className="venue-feed-header popit-tap-target" onClick={onSectionClick}>
        <span className="venue-feed-live-dot" aria-hidden />
        <h2 className="venue-feed-title font-display">Live Activity</h2>
      </button>

      <div ref={viewportRef} className="venue-feed-scroll" role="list">
        {loop.map((venue, i) => (
          <VenueCardItem key={`${venue.id}-${i}`} venue={venue} onClick={() => onVenueClick?.(venue)} />
        ))}
      </div>
    </section>
  );
}
