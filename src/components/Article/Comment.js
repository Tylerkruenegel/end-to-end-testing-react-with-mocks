import { Link } from 'react-router-dom';
import React from 'react';
import DeleteButton from './DeleteButton';

const Comment = (props) => {
  const comment = props.comment;
  const show = props.currentUser
    && props.currentUser.username === comment.author.username;
  return (
    <div test-id="comment" className="card">
      <div className="card-block">
        <p test-id="comment-body" className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author"
        >
          <img
            test-id="comment-author-image"
            src={comment.author.image}
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link
          test-id="comment-author"
          to={`/@${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span test-id="comment-date" className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton
          show={show}
          slug={props.slug}
          commentId={comment.id}
        />
      </div>
    </div>
  );
};

export default Comment;
