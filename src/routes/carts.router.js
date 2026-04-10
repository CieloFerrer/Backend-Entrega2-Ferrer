import { Router } from 'express';
import { cartModel } from '../models/cart.model.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartModel.create({ products: [] });
        res.send({ status: "success", payload: newCart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });
        res.send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        
        res.send({ status: "success", message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const cart = await cartModel.findByIdAndUpdate(cid, { products }, { new: true });
        res.send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        
        const cart = await cartModel.findById(cid);
        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.send({ status: "success", message: "Cantidad actualizada" });
        } else {
            res.status(404).send({ status: "error", message: "Producto no encontrado en carrito" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        await cartModel.findByIdAndUpdate(cid, { products: [] });
        res.send({ status: "success", message: "Carrito vaciado" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

export default router;