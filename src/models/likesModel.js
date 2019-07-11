import { Schema } from 'mongoose';

const Schema = Schema;

export const LikeSchema = new Schema({
    user: '',
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
},
{
    timestamps: true,
});
