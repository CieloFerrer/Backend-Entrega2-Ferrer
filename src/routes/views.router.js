import { Router } from 'express';
import { productModel } from '../models/product.model.js';
import { cartModel } from '../models/cart.model.js';

const router = Router();

router.get('/products', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort, query } = req.query;
        
        const filter = query ? { category: query } : {};
        
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
            lean: true
        };

        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = await productModel.paginate(filter, options);

        res.render('products', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,
            page
        });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).lean();
        
        if (!cart) return res.status(404).send("Carrito no encontrado");

        res.render('cart', { products: cart.products });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
});

export default router;