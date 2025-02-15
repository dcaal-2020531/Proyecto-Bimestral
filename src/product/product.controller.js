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