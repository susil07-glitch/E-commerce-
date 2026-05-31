import express from 'express';
import isAuthenticated from '../../../../MiddleWare/isAuthenticated';
import { deleteMyProfile, getMyProfile, updateMyProfile, UpdateProfilePasssword } from '../../Profile/ProfileController';
import restrictTo from '../../../../MiddleWare/RestrictTo';


const productroutes=express.Router();

productroutes.route("/user/Profile/:userId").post(isAuthenticated,restrictTo("user","admin"),getMyProfile);
productroutes.route("/user/update/Profile").patch(isAuthenticated,restrictTo("user","admin"),updateMyProfile);
productroutes.route("/user/delete/Profile").delete(isAuthenticated,restrictTo("user","admin"),deleteMyProfile);
productroutes.route("/user/update/password/Profile").patch(isAuthenticated,restrictTo("user","admin"),UpdateProfilePasssword);





 export default productroutes ;