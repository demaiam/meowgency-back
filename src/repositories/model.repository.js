import { db } from "../database/db.connection.js";

export function getModelsDB() {
  return db.query(`SELECT * FROM models;`);
}

export function getModelByIdDB(id) {
  return db.query(`SELECT * FROM models WHERE id=$1;`, [id]);
}

export function getPicturesDB(modelId) {
  return db.query(`SELECT image FROM images WHERE "modelId"=$1;`, [modelId])
}