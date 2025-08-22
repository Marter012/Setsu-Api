import { Router } from "express";
import {
  getPieceControllers,
  addPieceControllers,
  updatePiece,
} from "../controller/authPieceController";
import { check } from "express-validator";
import { collectErrors } from "../middlewares/collectErrors";

const router = Router();

// Endpoint GET ejemplo
router.get("/", (req, res) => {
  res.status(200).json({ msg: "authPiece endpoint" });
});

// Endpoint POST ejemplo
router.post("/add", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ msg: `Pieza ${name} agregada` });
});

router.get("/piece", getPieceControllers);

router.post(
  "/addPiece",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("description", "La descripcion es obligatoria.").not().isEmpty(),
    check("img", "La imagen es obligatoria.").not().isEmpty(),
    collectErrors,
  ],
  addPieceControllers
);

router.post(
  "/updatePiece",
  [
    check("code", "Error al recibir el codigo de identificacion.")
      .not()
      .isEmpty(),
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("description", "La descripcion es obligatoria.").not().isEmpty(),
    check("img", "La imagen es obligatoria.").not().isEmpty(),
    collectErrors,
  ],
  updatePiece
);

export default router;
