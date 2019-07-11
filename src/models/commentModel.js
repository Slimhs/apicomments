import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
    
    author: {
        type: String,
        required: 'Enter a comment\'s Author'
    },
    description: {
        type: String,
        required: 'Enter a comment'
    },
    date: {
       type: Date,
       default: Date.now 
    },
    likers: { type: [Schema.Types.String], default: [] },
},
{
    timestamps: true,
    usePushEach: true,
});
