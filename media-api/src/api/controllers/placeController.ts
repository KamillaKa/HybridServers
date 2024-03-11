import {Request, Response, NextFunction} from 'express';
import {fetchAllPlaces, createPlace} from '../models/placeModel';
import CustomError from '../../classes/CustomError';

const placeListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const places = await fetchAllPlaces();
    if (places) {
      res.json(places);
      return;
    }
    next(new CustomError('No places found', 404));
  } catch (error) {
    next(error);
  }
};

const placePost = async (
  req: Request<{}, {}, {place_name: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createPlace(req.body.place_name);
    res.status(201).json({message: 'Place created'});
  } catch (error) {
    next(error);
  }
};

export {placeListGet, placePost};
