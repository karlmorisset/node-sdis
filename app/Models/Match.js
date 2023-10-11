import { Schema, model } from 'mongoose';

const match = {
  teams: {
    type: String,
    trim: true,
    required: true,
    immutable: true,
  },
  scores: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    trim: true,
    required: true,
    immutable: true,
  },
  venue: {
    stade: String,
    city: String,
  },
  status: String,
  played: Boolean,
};

export default model('Match', new Schema(match, { timestamps: true }));
