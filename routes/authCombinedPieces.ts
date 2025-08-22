import { Router } from "express";
import { check } from "express-validator";
import { collectErrors } from "../middlewares/collectErrors";
import {
  getCombinedPiecesControllers,
  addCombinedPiecesControllers,
  updateCombinedPieces,
} from "../controller/authCombinedPiecesControllers";
const router = Router();

router.get("/combinedPieces", getCombinedPiecesControllers);

router.post(
  "/addCombinedPieces",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("typePieces", "Los tipos de piezas son obligatorios.")
      .not()
      .isEmpty(),
    check("img", "La imagen es obligatoria.").not().isEmpty(),
    collectErrors,
  ],
  addCombinedPiecesControllers
);

router.post(
  "/updateCombinedPieces",
  [
    check("code", "Error al recibir el codigo de identificacion.")
      .not()
      .isEmpty(),
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("img", "La imagen es obligatoria.").not().isEmpty(),
    check("typePieces", "Los tipos de piezas son obligatorios.")
      .not()
      .isEmpty(),
    collectErrors,
  ],
  updateCombinedPieces
);

export default router;
