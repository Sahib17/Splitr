// GET    /users/:id
// PUT    /users/:id
// DELETE /users/:id
import express from "express";
const router = express.Router();

router.get('/', (req, res)=> {
    res.send('hi');
})

// 
router.get('/:id', aFunction);

router.put('/:id', aFunction);

router.delete('/:id', aFunction);

export default router;

function aFunction(){

}