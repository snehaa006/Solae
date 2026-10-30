import { starRow, type Review } from "../../data/reviews";
import { useToast } from "../../context/toast";

// reviews are dated by day, so read them in UTC and the day never shifts with the viewer's time zone
const day = (date: string) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/* reviews: a deep teal field with the average, then the list */
export function Reviews({ reviews, rating }: { reviews: Review[]; rating: number }) {
  const toast = useToast();
  const count = `${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`;
  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-title">
      <div className="reviews__band field field--deep"><div className="wrap reviews__head">
        <h2 id="reviews-title" className="t-headline">what girls <em>are saying</em></h2>
        {reviews.length
          ? <><p className="reviews__avg">{rating.toFixed(1)}</p><p className="t-label">average rating</p><p className="reviews__count">based on {count}</p></>
          : <p className="reviews__count">no reviews yet. be the first to tell us how it fits.</p>}
        <button className="btn btn--ghost-light" type="button" onClick={() => toast("reviews open once drop 01 ships ☀")}>write a review</button>
      </div></div>
      {reviews.length > 0 && (
        <div className="wrap reviews__list">
          {reviews.map(r => (
            <article className="review" key={r.name + r.date}>
              <p className="review__stars" aria-label={`${r.rating} out of 5 stars`}>{starRow(r.rating)}</p>
              <div className="review__who">
                <span className="review__avatar" aria-hidden="true">{r.name[0]}</span>
                <p><b>{r.name}</b><small>{day(r.date)}</small></p>
              </div>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
