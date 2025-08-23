import { Request, Response } from "express";
import CombinedPieces, { ICombinedPieces } from "../models/combinedPieces";
import randomstring from "randomstring";
import { connectBD } from "../dataBase/DBConfig";

export const getCombinedPiecesControllers = async (
  req: Request,
  res: Response
) => {
  await connectBD();

  try {
    const combinedPieces = await CombinedPieces.find().exec();
    if (combinedPieces.length === 0) {
      res.status(404).json({
        msg: "No se encontraron combinados de piezas en la base de datos.",
      });
      return;
    }
    res.status(200).json({
      combinedPieces,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor.",
    });
  }
};

export const addCombinedPiecesControllers = async (
  req: Request,
  res: Response
) => {
  await connectBD();

  const { name, typePieces, img }: ICombinedPieces = req.body;

  try {
    const combinedPieces = new CombinedPieces({
      name,
      typePieces,
      img,
    });

    const newCode = randomstring.generate(6);

    combinedPieces.code = newCode;
    await combinedPieces.save();
    res.status(201).json({
      message: "Combinado agregado correctamente",
      combinedPieces,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Combinado ya existente, crea uno nuevo." });
    }
    res.status(500).json({ message: "Error al guardar", error });
  }
};

export const updateCombinedPieces = async (req: Request, res: Response) => {
  await connectBD();

  const { code, img, name, typePieces }: ICombinedPieces = req.body;
  try {
    const combinedPieces = await CombinedPieces.findOne({ code });

    if (!combinedPieces) {
      res.status(404).json({
        msg: "No se encontro el combinado de piezas en la base de datos.",
      });
      return;
    }

    if (code !== combinedPieces.code) {
      res.status(401).json({
        msg: "El codigo ingresado no es correcto.",
      });
      return;
    }

    await CombinedPieces.findOneAndUpdate(
      { code },
      { code, img, name, typePieces },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      msg: "Combinado actualizado correctamente.",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        msg: `Ya existe un combinado con ese nombre (${error.keyValue.name}), elige otro.`,
      });
    }

    console.error(error);
    return res.status(500).json({
      msg: "Error en el servidor.",
    });
  }
};
