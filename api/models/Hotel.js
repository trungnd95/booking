import Joi from 'joi';
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export function validateInput(hotelData) {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    distance: Joi.string().required(),
    photos: Joi.array().items(Joi.string()),
    desc: Joi.string().required(),
    rating: Joi.number().min(0).max(5),
    rooms: Joi.array().items(Joi.string()),
    cheapestPrice: Joi.number().required(),
    featured: Joi.boolean(),
  });

  return schema.validate(hotelData);
}

export default Hotel;
