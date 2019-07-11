import mongoose from 'mongoose';
import { CommentSchema } from '../models/commentModel';

function commentPresenter(_comment) {
    const comment = _comment.toObject()
    return {...comment, id: comment._id, likes: comment.likers.length };
}

const Comment = mongoose.model('Comment', CommentSchema);

export const addNewComment = (req, res) => {
    let newComment = new Comment(req.body);

    newComment.save((err, comment) => {
        if (err) {
            res.send(err);
        }
        const presentation = commentPresenter(comment);
        res.json(presentation);
    });
};

export const getComments = (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.send(err);
        }
        res.json(comments.map(commentPresenter));
    });
};

export const getCommentWithID = (req, res) => {
    Comment.findById(req.params.commentId, (err, comment) => {
        if (err) {
            res.send(err);
        }
        res.json(commentPresenter(comment));
    });
}

export const updateComment = (req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.commentId}, req.body, { new: true }, (err, comment) => {
        if (err) {
            res.send(err);
        }
        res.json(commentPresenter(comment));
    })
}

export const likeComment = (req, res) => {
    const { author } = req.body;

    Comment.findOne({ _id: req.params.commentId })
    .then(comment => {
        if (comment.likers.includes(author)) {
            res.status(400);
            res.json('User has already liked this comment');
        }
        comment.likers.push(author);
        comment.save()
        .then(doc => res.json(commentPresenter(doc)))  
        .catch(err => { res.status(400); res.json(err);});
    })
    .catch(err => res.json(err));
}

export const unlikeComment = (req, res) => {
    const { author } = req.body;

    Comment.findOne({ _id: req.params.commentId })
    .then(comment => {
        if (!comment.likers.includes(author)) {
            res.status(400);
            res.json('User didn\'t like this comment, he cannot dislike it');
        }
        
        comment.likers = comment.likers.filter(liker => liker != author);
        comment.save()
        .then(doc => res.json(commentPresenter(doc)))  
        .catch(err => { res.status(400); res.json(err);});
    })
    .catch(err => res.json(err));
}

export const deleteComment = (req, res) => {
    Comment.remove({ _id: req.params.commentId }, (err, comment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted comment'});
    })
}