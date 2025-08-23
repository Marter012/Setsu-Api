import { Request, Response } from "express";
import Piece, { IPiece } from "../models/piece";
import randomstring from "randomstring";
import { connectBD } from "../dataBase/DBConfig";

export const getPieceControllers = async (req: Request, res: Response) => {
  await connectBD();
  try {
    const pieces = await Piece.find().exec();
    if (pieces.length === 0) {
      res.status(404).json({
        msg: "No se encontraron piezas en la base de datos.",
      });
      return;
    }
    res.status(200).json({
      pieces,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor.",
    });
  }
};

export const addPieceControllers = async (req: Request, res: Response) => {
  await connectBD();

  const { name, description, img }: IPiece = req.body;

  try {
    const piece = new Piece({
      name,
      description,
      img,
    });

    const newCode = randomstring.generate(6);

    piece.code = newCode;
    await piece.save();
    res.status(201).json({
      message: "Pieza agregada correctamente",
      piece,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Pieza ya existente, crea una nueva." });
    }
    res.status(500).json({ message: "Error al guardar", error });
  }
};

export const updatePiece = async (req: Request, res: Response) => {
  await connectBD();

  const { code, description, img, name }: IPiece = req.body;

  try {
    const piece = await Piece.findOne({ code });

    if (!piece) {
      res.status(404).json({
        msg: "No se encontro la pieza en la base de datos.",
      });
      return;
    }

    if (code !== piece.code) {
      res.status(401).json({
        msg: "El codigo ingresado no es correcto.",
      });
      return;
    }

    await Piece.findOneAndUpdate(
      { code },
      { code, img, name, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      msg: "Pieza actualizada correctamente",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        msg: `Ya existe una pieza con ese nombre (${error.keyValue.name}), elige otro.`,
      });
    }
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor.",
    });
  }
};
