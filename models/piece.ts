import { model, Model, Schema } from "mongoose";

export interface IPiece {
  code: string;
  name: string;
  description: string;
  img: string;
  state: boolean;
}

export const PieceSchema = new Schema<IPiece>({
  code: {
    type: String,
    unique : true
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

PieceSchema.methods.toJSON = function () {
  const { __v, _id, ...piece } = this.toObject();

  return piece;
};

const Piece: Model<IPiece> = model<IPiece>("piece", PieceSchema, );

export default Piece;
