import express from 'express';
import Router from 'express';
import {User} from '../models/users.model.js';

const router = Router();
import {
  registerUser,
  loginUser
} from '../controllers/users.controller.js';

router.post('/register', (req, res) => {
    registerUser(req, res);
});

router.post('/login', (req, res) => {
    loginUser(req, res);
});

export default router;