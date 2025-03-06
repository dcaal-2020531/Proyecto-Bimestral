import Product from "./product.model.js";


export const save = async(req, res) => {
    try {
        const data = req.body
        const product = new Product(data)
        await product.save()
        return res.send(
            {
                success: true,
                message: `${product.name} saved successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding product',
                err
            }
        )
    }
}


export const getAll = async(req,res)=>{
    try {
        const {limit = 20, skip=0} = req.query
        const products = await Product.find()
        .skip(skip)
        .limit(limit)

        if(products.length === 0) return res.status(404).send({message: 'Products not found', success: false})
        return res.send(
            {
                success: true,
                message: 'Products found: ', 
                products: products,
                total: products.length
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const updateProducts = async (req, res) => {
    try {
        const { productId } = req.params;
        const updates = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }


        delete updates.role;
        delete updates.password;

        const updateProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

        return res.send({ message: 'Profile updated successfully', updateProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating product', err });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(productId);

        return res.send({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Product', err });
    }
}


export const outOfStock = async (req, res) => {
    try {
        const products = await Product.find({ stock: 0 });

        return res.send(products);
        
    } catch (err) {
        console.error(err);
        return res.status(500).send({ err });
    }
}

export const getByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await Product.findOne({ name });

        if (!product) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        return res.send({ success: true, message: 'Product found', product });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error retrieving product', err });
    }
}


export const orderBySales = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ sells: -1 }); 
        if (products.length === 0) {
            return res.status(404).send({ success: false, message: 'products not found' });
        }

        return res.send({
            success: true,
            message: 'products sorted by experience (least to most):',
            products
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error sorting the list', err });
    }
}


export const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const product = await Product.find({ category });

        if (!product) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        return res.send({ success: true, message: 'Product found', product });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error retrieving product', err });
    }
}

