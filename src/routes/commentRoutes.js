import { 
    addNewComment, 
    getComments, 
    getCommentWithID, 
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment,
} from '../controllers/commentController';

const routes = (app) => {
    app.route('/comments')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getComments)
    
    // POST endpoint
    .post(addNewComment);

    app.route('/comments/:commentId')
    // get specific comment
    .get(getCommentWithID)
    
    // put request
    .put(updateComment)

    // delete request
    .delete(deleteComment);
    
    app.route('/comments/:commentId/like')
    .put(likeComment)

    app.route('/comments/:commentId/unlike')
    .put(unlikeComment)
}

export default routes;
