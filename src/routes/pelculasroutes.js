import {Router} from 'express'
import pool from '../database.js'

const router = Router();

/* --- */
router.get('/addp', (req,res)=>{
    res.render('peliculas/addp');
});

/* ---  */
router.post('/addp', async(req, res)=>{
    try{
        const {nom_pel, dur_pel, des_pel, anio_pel, cat_pel} = req.body;
        const newPelicula = {
           nom_pel, dur_pel, des_pel, anio_pel, cat_pel
        }
        await pool.query('INSERT INTO peliculas SET ?', [newPelicula]);
        res.redirect('/listp');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});



router.get('/listp', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM peliculas');
        res.render('peliculas/listp', {peliculas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/editp/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [pelicula] = await pool.query('SELECT * FROM peliculas WHERE id_pel = ?', [id]);
        const peliculaEdit = pelicula[0];
        res.render('peliculas/editp', {pelicula: peliculaEdit});
    }
    
    catch(err){
        res.status(500).json({message:err.message});
    }
    
})

router.post('/editp/:id', async(req, res)=>{
    try{
        const { nom_pel, dur_pel, des_pel, anio_pel, cat_pel } = req.body;
        const {id} = req.params;
        const editPelicula = { nom_pel, dur_pel, des_pel, anio_pel, cat_pel};
        await pool.query('UPDATE peliculas SET ? WHERE id_pel = ?', [editPelicula, id]);
        res.redirect('/listp');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/deletep/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM peliculas WHERE id_pel = ?', [id]);
        res.redirect('/listp');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;






