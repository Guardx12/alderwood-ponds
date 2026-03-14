import { reviews } from "@/components/site-data"

function Stars() {
  return <span className="review-stars" aria-label="5 star review">★★★★★</span>
}

export function ReviewMarquee({ compact = false }: { compact?: boolean }) {
  const items = [...reviews, ...reviews]

  return (
    <section className={`review-section ${compact ? "review-section-compact" : "section"}`}>
      {!compact ? (
        <div className="container">
          <div className="section-heading left-tight">
            <span>Visitor reviews</span>
            <h2>What anglers say about Alderwood Ponds</h2>
            <p>Real feedback from visitors to help new anglers see what people love about the fishery.</p>
          </div>
        </div>
      ) : null}
      <div className="review-marquee-shell">
        <div className="review-marquee-track">
          {items.map((review, index) => (
            <article className="review-card" key={`${review.name}-${index}`}>
              <Stars />
              <p className="review-text">“{review.text}”</p>
              <div className="review-meta">
                <strong>{review.name}</strong>
                <span>{review.when}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
