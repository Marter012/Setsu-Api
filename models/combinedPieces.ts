import { model, Model, Schema } from "mongoose";

export interface ICombinedPieces {
  code: string;
  name: string;
  typePieces: string;
  img: string;
  state: boolean;
}

export const CombinedPiecesSchema = new Schema<ICombinedPieces>({
  code: {
    type: String,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  typePieces: {
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

CombinedPiecesSchema.methods.toJSON = function () {
  const { __v, _id, ...combinedPiece } = this.toObject();
  return combinedPiece;
};

const CombinedPieces : Model<ICombinedPieces> = model<ICombinedPieces>("combinedPiece",CombinedPiecesSchema)

export default CombinedPieces;