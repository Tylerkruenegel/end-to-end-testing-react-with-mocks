import React from 'react';
import Comment from './Comment';

const CommentList = props => (
  <div test-id="comment-list">
    {
        props.comments.map(comment => (
          <Comment
            test-id="comment"
            comment={comment}
            currentUser={props.currentUser}
            slug={props.slug}
            key={comment.id}
          />
        ))
      }
  </div>
);

export default CommentList;
