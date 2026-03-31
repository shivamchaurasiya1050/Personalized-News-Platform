export default function AdCard({ ad, onClick }) {
  return (
    <>
      <div className="ad-card track-ad" data-id={ad._id}>
        <span className="tag">Sponsored</span>

        {/* IMAGE SHOW */}
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="ad-image"
        />

        <h4>{ad.title}</h4>

        {/* CLICK LINK */}
        <a
          href={ad.targetLink || ad.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClick(ad._id)}
        >
          Visit →
        </a>
      </div>

      <style jsx>{`
        .ad-card {
          border: 1px dashed orange;
          padding: 10px;
          margin: 10px;
          border-radius: 10px;
          background: #fff7ed;
          position: relative;
        }

        .tag {
          position: absolute;
          top: 5px;
          right: 10px;
          font-size: 11px;
          background: orange;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .ad-image {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
}