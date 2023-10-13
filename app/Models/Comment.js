import { Schema, SchemaTypes, model } from 'mongoose';

const comment = {
  comment: {
    type: String,
    required: [true, 'Le commentaire ne peut pas être vide'],
    maxLength: 500,
  },
  match: {
    type: SchemaTypes.ObjectId,
    ref: 'Match',
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
};

export default model('Comment', new Schema(comment, { timestamps: true }));
