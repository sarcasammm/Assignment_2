import express from 'express';
import supplementCtrl from '../controllers/supplement.controller.js';

const router = express.Router();

router.route('/api/supplements')
  .get(supplementCtrl.list)
  .post(supplementCtrl.create);

router.route('/api/supplements/:supplementId')
  .get(supplementCtrl.read)
  .put(supplementCtrl.update)
  .delete(supplementCtrl.remove);

router.param('supplementId', supplementCtrl.supplementByID);

export default router;