import express from 'express';
import {placeListGet, placePost} from '../controllers/placeController';
import {authenticate, validationErrors} from '../../middlewares';
import {body} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(placeListGet)
  .post(
    authenticate,
    body('place_name').notEmpty().isString().escape(),
    validationErrors,
    placePost
  );

export default router;
