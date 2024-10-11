import Supplement from '../models/supplement.model.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
    const supplement = new Supplement(req.body);

    try {
        await supplement.save();
        return res.status(200).json({
            message: "Supplement added successfully!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }   
};

const list = async (req, res) => {
    try {
      let supplements = await Supplement.find().select('id name description price quantity');
      res.json(supplements);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };

  const supplementByID = async (req, res, next, id) => {
    try {
      let supplement = await Supplement.findById(id);
      if (!supplement)
        return res.status(400).json({
          error: "Supplement not found"
        });
      req.profile = supplement;
      next();
    } catch (err) {
      return res.status(400).json({
        error: "Could not retrieve supplement"
      });
    }
  };

  const read = (req, res) => {
    return res.json(req.profile);
  };

  const update = async (req, res) => {
    try {
      let supplement = req.profile;
      supplement = extend(supplement, req.body);
      supplement.updated = Date.now();
      await supplement.save();
      res.json(supplement);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };

  const remove = async (req, res) => {
    try {
      let supplement = req.profile;
      let deletedSupplement = await supplement.deleteOne();
      res.json(deletedSupplement);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };
  
  export default { create, list, supplementByID, read, update, remove };
  