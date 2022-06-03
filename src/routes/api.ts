import {Router, Request, Response} from 'express';
import * as AuthController from '../controllers/AuthController';
import * as UserController from '../controllers/UserController';
import * as AdsController from '../controllers/AdsController';
import {Auth} from '../middlewares/Auth';
import {AuthValidator} from '../validators/AuthValidator';
import {UserValidator} from '../validators/UserValidator';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


const fileuploadConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './tmp');
    },
    filename:(req, file, cb)=>{
        let fileId = `${uuidv4()}.jpg`;
        cb(null, fileId);
    }
});

const upload = multer({
    storage: fileuploadConfig,
    fileFilter: (req, file, cb)=>{
        const accept:String[] = ['image/jpg', 'image/png', 'image/jpeg'];
        if(accept.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
})

const router = Router();

router.get('/ping', (req:Request, res:Response)=>{
    res.json({pong:true});
});

router.get('/state', UserController.getState);

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

router.get('/user/me',Auth.private ,UserController.info);
router.put('/user/me',UserValidator.editAction ,Auth.private ,UserController.editAction);

router.get('/categories', AdsController.getCategories);

router.post('/ad/add', Auth.private, upload.array('photos', 4), AdsController.addAction);
router.get('ad/list', AdsController.getList);
router.get('ad/item', AdsController.getItem);
router.post('ad/:id',Auth.private ,AdsController.editAction);

export default router;