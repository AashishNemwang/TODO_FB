import express from 'express';
import { createNewTodo, getTodos, updateTodo, deleteTodo } from '../Controller/todoController.js';

const router = express.Router();

router.post('/create', createNewTodo);       
router.get('/', getTodos);                   
router.put('/:id', updateTodo);              
router.delete('/:id', deleteTodo);           

export default router;


