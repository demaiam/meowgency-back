import { getModelsDB, getModelByIdDB, getPicturesDB } from "../repositories/model.repository.js";

export async function getModels(req, res) {
  try {
    const models = await getModelsDB();

    res.send(models.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getModelById(req, res) {
  const { id } = req.params;

  try {
    const model = await getModelByIdDB(id);
    if (!model.rowCount) return res.status(404).send({ message: "Model doesn't exist" });

    const pictures = await getPicturesDB(model.rows[0].id);
    if (!pictures.rowCount) return res.status(402).send({ message: "Couldn't find model's images" });

    const obj = {
      ...model.rows[0],
      images: 
      pictures.rows
    }

    res.send(obj);
  } catch (err) {
    res.status(500).send(err.message);
  }
}