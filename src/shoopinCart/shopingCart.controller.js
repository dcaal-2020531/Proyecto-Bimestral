import ShoppingCart from "./shoppingCart.model.js"; // Asegúrate de que la ruta sea la correcta

export const save = async (req, res) => {
    try {
        const data = req.body;
        const shoppingCart = new ShoppingCart(data);
        await shoppingCart.save();
        return res.send(
            {
                success: true,
                message: `Shopping cart saved successfully`
            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding shopping cart',
                err
            }
        );
    }
};
