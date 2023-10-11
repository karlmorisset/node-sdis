import { Schema, SchemaTypes, model } from 'mongoose';

const comment = {
  content: {
    type: String,
    required: [true, 'Le commentaire ne peut pas être vide'],
    maxLength: 500,
  },
  match: {
    type: SchemaTypes.ObjectId,
    ref: 'Match',
  },
};

export default model('Comment', new Schema(comment, { timestamps: true }));
