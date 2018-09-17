import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from './ArticleActions';


const ArticleMeta = (props) => {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link test-id="article-author" to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span test-id="article-post-date" className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
