"use client";



import { motion } from "framer-motion";

import { useRef } from "react";

import type { PoppingCard } from "./popping/types";

import { formatPoppingCount, rankMedal } from "./popping/generator";

import PopScoreRing from "./PopScoreRing";
import PopMark from "@/components/pop-marks/PopMark";




type PoppingCardViewProps = {

  card: PoppingCard;

  reducedMotion: boolean;

  onTap: () => void;

  onLongPress: () => void;

};



function LiveStat({ value, prefix }: { value: number; prefix: string }) {

  return (

    <motion.span

      key={value}

      initial={{ opacity: 0.75, y: 1 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.35 }}

    >

      {prefix} {formatPoppingCount(value)}

    </motion.span>

  );

}



export default function PoppingCardView({ card, reducedMotion, onTap, onLongPress }: PoppingCardViewProps) {

  const pressTimer = useRef<number | null>(null);

  const longPressFired = useRef(false);



  const startPress = () => {

    longPressFired.current = false;

    pressTimer.current = window.setTimeout(() => {

      longPressFired.current = true;

      onLongPress();

    }, 520);

  };



  const endPress = () => {

    if (pressTimer.current) {

      clearTimeout(pressTimer.current);

      pressTimer.current = null;

    }

  };



  const handleClick = () => {

    if (longPressFired.current) {

      longPressFired.current = false;

      return;

    }

    onTap();

  };



  return (

    <motion.article

      role="listitem"

      className={`popping-card-s2 popping-card-s2-${card.kind}`}

      onClick={handleClick}

      onPointerDown={startPress}

      onPointerUp={endPress}

      onPointerLeave={endPress}

      onPointerCancel={endPress}

      whileTap={{ scale: 0.97 }}

      layout={false}

    >

      <span className="popping-card-s2-glass" aria-hidden />

      <span className="popping-card-s2-edge" aria-hidden />

      <span className="popping-card-s2-shimmer" aria-hidden />

      {!reducedMotion && (

        <span className="popping-card-s2-particles" aria-hidden>

          <span className="popping-card-s2-particle" />

          <span className="popping-card-s2-particle" />

        </span>

      )}



      <div className="popping-card-s2-top">

        <span className="popping-card-s2-rank font-display" aria-label={`Rank ${card.rank}`}>

          {rankMedal(card.rank)}

        </span>

        <PopScoreRing score={card.popScore} reducedMotion={reducedMotion} />

      </div>



      <div className="popping-card-s2-media">

        {/* eslint-disable-next-line @next/next/no-img-element */}

        <img src={card.image} alt="" className="popping-card-s2-image" loading="lazy" decoding="async" />

        {card.kind === "live_video" && <span className="popping-card-s2-live-badge font-body">🔴 LIVE</span>}

      </div>



      <div className="popping-card-s2-body">

        <CardBody card={card} reducedMotion={reducedMotion} />

        {card.trending && (

          <span className="popping-card-s2-trending font-body">🔥 TRENDING NOW</span>

        )}

      </div>

    </motion.article>

  );

}



function CardBody({ card, reducedMotion }: { card: PoppingCard; reducedMotion: boolean }) {

  const Stat = reducedMotion

    ? ({ value, prefix }: { value: number; prefix: string }) => (

        <span>

          {prefix} {formatPoppingCount(value)}

        </span>

      )

    : LiveStat;



  switch (card.kind) {

    case "creator":

    case "athlete":

    case "music_artist":

    case "photographer":

    case "community":

      return (

        <>

          <div className="popping-card-s2-name-row">

            <h3 className="popping-card-s2-title font-display">{card.title}</h3>

            {card.popMark && (
              <PopMark tier={card.popMark} size={16} animate={false} interactive={false} label={`${card.title} POP Mark`} />
            )}

          </div>

          <p className="popping-card-s2-meta font-body">{card.category}</p>

          {card.city && <p className="popping-card-s2-meta font-body">📍 {card.city}</p>}

          <div className="popping-card-s2-stats font-body">

            {card.likes != null && <Stat value={card.likes} prefix="❤️" />}

            {card.comments != null && <Stat value={card.comments} prefix="💬" />}

            {card.shares != null && <Stat value={card.shares} prefix="🔁" />}

          </div>

          {card.followersToday != null && (

            <p className="popping-card-s2-gain font-body">

              +{formatPoppingCount(card.followersToday)} followers today

            </p>

          )}

        </>

      );



    case "business":

      return (

        <>

          <h3 className="popping-card-s2-title font-display">{card.title}</h3>

          <p className="popping-card-s2-meta font-body">

            {card.rating != null && <span>⭐ {card.rating.toFixed(1)}</span>}

            {card.distance && <span> · 📍 {card.distance}</span>}

          </p>

          {card.savesToday != null && (

            <p className="popping-card-s2-gain font-body">+{formatPoppingCount(card.savesToday)} saves today</p>

          )}

          <span className="popping-card-s2-chip font-body">🔥 Trending</span>

        </>

      );



    case "event":

    case "nightlife":

    case "charity":

      return (

        <>

          <h3 className="popping-card-s2-title font-display">{card.title}</h3>

          <p className="popping-card-s2-meta font-body">{card.category}</p>

          {card.countdown && (

            <p className="popping-card-s2-countdown font-display">

              Starts in <strong>{card.countdown}</strong>

            </p>

          )}

          {card.interested != null && (

            <p className="popping-card-s2-gain font-body">

              🔥 {formatPoppingCount(card.interested)} Interested

            </p>

          )}

        </>

      );



    case "live_video":

      return (

        <>

          <h3 className="popping-card-s2-title font-display">{card.title}</h3>

          {card.viewers != null && (

            <p className="popping-card-s2-gain font-body">{formatPoppingCount(card.viewers)} Watching</p>

          )}

        </>

      );



    case "local_story":

      return (

        <>

          <h3 className="popping-card-s2-title font-display">{card.title}</h3>

          <p className="popping-card-s2-meta font-body">{card.category}</p>

          <div className="popping-card-s2-stats font-body">

            {card.likes != null && <Stat value={card.likes} prefix="❤️" />}

            {card.comments != null && <Stat value={card.comments} prefix="💬" />}

          </div>

        </>

      );



    default:

      return null;

  }

}


