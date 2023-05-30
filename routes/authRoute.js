import express  from 'express';
import { registerController,LogInController} from '../controllers/authControoler.js';

// router objrct 

const router = express.Router();
// Register | Methode POST
router.post('/register', registerController)
// LOGIN | Methode POST
router.post('/login', LogInController)

export default router;