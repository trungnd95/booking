import Joi from 'joi';
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
  },
  { timestamps: true },
);
roomSchema.path('roomNumbers').validate((v) => v.length >= 1);

const Room = mongoose.model('Room', roomSchema);

export function validateInput(roomData) {
  const schema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    maxPeople: Joi.number().required(),
    desc: Joi.string().required(),
    roomNumbers: Joi.array().items(
      Joi.object({
        number: Joi.number().required(),
        unavailableDates: Joi.array().items(Joi.Date()).min(1).required(),
      }),
    ),
  });

  return schema.validate(roomData);
}

export default Room;
