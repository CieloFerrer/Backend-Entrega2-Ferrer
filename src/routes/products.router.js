import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;
        
        const filter = query ? { 
            $or: [
                { category: query }, 
                { status: query === 'true' } 
            ] 
        } : {};
        
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
            lean: true
        };

        const result = await productModel.paginate(filter, options);

        res.send({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null
        });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    const product = await productModel.findById(req.params.pid);
    if (!product) return res.status(404).send({ error: "Producto no encontrado" });
    res.send({ status: "success", payload: product });
});

router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send({ error: "Faltan campos obligatorios" });
    }

    const newProduct = await manager.addProduct({ title, description, code, price, stock, category, thumbnails: thumbnails || [] });
    
    const products = await manager.getProducts();
    req.io.emit('updateProducts', products);

    res.send({ status: "success", payload: newProduct });
});

router.put('/:pid', async (req, res) => {
    const updated = await manager.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).send({ error: "No se pudo actualizar" });
    
    const products = await manager.getProducts();
    req.io.emit('updateProducts', products);

    res.send({ status: "success", payload: updated });
});

router.delete('/:pid', async (req, res) => {
    const result = await manager.deleteProduct(req.params.pid);
    if (!result) return res.status(404).send({ error: "No se pudo eliminar" });

    const products = await manager.getProducts();
    req.io.emit('updateProducts', products);

    res.send({ status: "success", message: "Producto eliminado" });
});

export default router;