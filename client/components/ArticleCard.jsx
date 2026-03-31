export default function ArticleCard({ article, onSave, isSaved }) {
  return (
    <>
      <div className="card">
        
        <h3 className="title">{article.title}</h3>

        <p className="desc">{article.description}</p>

        <div className="footer">
          <span className="date">
            {new Date(article.pubDate).toDateString()}
          </span>

          <button
            onClick={() => onSave(article._id)}
            className={`btn ${isSaved ? "saved" : ""}`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>

      </div>

      {/* SAME FILE CSS */}
      <style jsx>{`
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          margin: 12px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #111;
        }

        .desc {
          font-size: 14px;
          color: #555;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .date {
          font-size: 12px;
          color: #888;
        }

        .btn {
          background: #111;
          color: #fff;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: 0.2s;
        }

        .btn:hover {
          opacity: 0.85;
        }

        .saved {
          background: #22c55e;
        }
      `}</style>
    </>
  );
}