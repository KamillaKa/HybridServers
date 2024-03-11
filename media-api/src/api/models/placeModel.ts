import {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from '../../lib/db';
import {Place} from '@sharedTypes/DBTypes';

const fetchAllPlaces = async (): Promise<Place[] | null> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Place[]>(
      'SELECT * FROM Places'
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (e) {
    console.error('fetchAllPlaces error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const fetchPlaceById = async (id: number): Promise<Place | null> => {
  try {
    const [rows] = await promisePool.execute<RowDataPacket[] & Place[]>(
      'SELECT * FROM Places WHERE place_id = ?',
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('fetchPlaceById error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

const createPlace = async (place_name: string): Promise<void> => {
  try {
    const sql = 'INSERT INTO Places (place_name) VALUES (?)';
    await promisePool.execute<ResultSetHeader>(sql, [place_name]);
  } catch (e) {
    console.error('createPlace error', (e as Error).message);
    throw new Error((e as Error).message);
  }
};

export {fetchAllPlaces, fetchPlaceById, createPlace};
