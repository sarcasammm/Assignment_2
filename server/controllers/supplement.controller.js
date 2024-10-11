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