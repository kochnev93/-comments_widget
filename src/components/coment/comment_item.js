import React from 'react';
import avatar from "./img/avatar.gif";

const Comment = (props) => {
  return (
    <div className = "list-comment-item author">
        <div className = "author__logo">
            <img src = {avatar} />
        </div>
        <div className = "author__content">
            <div className = "author__name">
                <span>
                    {props.author}
                </span>

                <div className = "comment-action">
                    <i className = "fas fa-times delete-comment" title = "Удалить комментарий" onClick = {props.removeComment}></i>
                </div>
            </div>
            <div className = "author__text">
                {props.text}
            </div>
            <div className = "author__datatime">
                {props.date}
            </div>
        </div>
    </div>
  );
}

export default Comment;



                 
