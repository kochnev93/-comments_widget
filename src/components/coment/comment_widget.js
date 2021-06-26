import React from 'react';
import "./comment_widget.css";
import Comment from './comment_item';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            comments: [],
            form: {
                name: '',
                comment: ''
            }
        }

        this.changeComment = this.changeComment.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('state')) {
            this.setState({ ...JSON.parse(localStorage.getItem('state')) })
        }     
    }

    addComment() {
        const comments = this.state.comments;

        comments.push({
            name: this.state.form.name,
            comment: this.state.form.comment,
            date: this.getDate()
        });

        this.setState({
            comments,
            form: {
                name: '',
                comment: ''
            }
        });

        localStorage.setItem('state', JSON.stringify(this.state));
    }

    changeComment = (e) => {

        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

     removeComment(i) {
        const comments = this.state.comments;

        comments.splice(i, 1);

        if (comments.length == 0) {
           this.setState({
            comments,
            form: {
                name: '',
                comment: ''
            }
          })

            localStorage.clear();
        }
        else{
          this.setState({
            comments,
            form: {
                name: '',
                comment: ''
            }
          })

          localStorage.setItem('state', JSON.stringify(this.state));
        }
    }

    getDate() {
        let date = new Date();
    
        let options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        };
    
        return date.toLocaleString("ru", options);
    }

    render() {
        return (
            <div className = "container">
                <div className = "add-comment">
                    <form className = "form-comment">

                        <textarea 
                        value = {this.state.form.comment}
                        onChange = {this.changeComment}
                        id = "comment-text" 
                        placeholder = "Оставить комментарий"
                        name = "comment" />

                        <p id="error-msg"></p>

                        <input
                        value = {this.state.form.name}
                        onChange = {this.changeComment} 
                        type = "text" 
                        placeholder = "Ваше имя"
                        autoComplete = "off"
                        name = "name" />

                        <input 
                        type = "button" 
                        value = "Отправить" 
                        onClick = {this.addComment} />

                    </form>
                </div>
            
                <div className = "list-comment">


                {
                    this.state.comments.map((comment, i) => {
                        return(
                            <Comment
                              key={i}
                              text={comment.comment}
                              author={comment.name}
                              date={comment.date}
                              removeComment={this.removeComment.bind(this, i)}
                            />
                        )
                    })
                }

                </div>
            </div>
        );
    }
}

export default App;