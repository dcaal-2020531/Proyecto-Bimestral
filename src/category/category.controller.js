import Category from "./category.model.js";
import Product from "../product/product.model.js"

export const save = async(req, res) => {
    try {
        const data = req.body
        const category = new Category(data)
        await category.save()
        return res.send(
            {
                success: true,
                message: `${category.name} saved successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding category',
                err
            }
        )
    }
}


export const getAll = async(req,res)=>{
    try {
        const {limit = 20, skip=0} = req.query
        const categories = await Category.find()
        .skip(skip)
        .limit(limit)

        if(categories.length === 0) return res.status(404).send({message: 'category not found', success: false})
        return res.send(
            {
                success: true,
                message: 'categories found: ', 
                categories: categories,
                total: categories.length
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

export const updateCategory = async (req, res) => {
    try {
        const { categoryId: categoryId } = req.params;
        const updates = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }


        delete updates.role;
        delete updates.password;

        const updateCategory = await Category.findByIdAndUpdate(categoryId, updates, { new: true });

        return res.send({ message: 'Profile updated successfully', updateCategory });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Category', err });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' })
        }

        const defaultCategory = await Category.findOne({ name: 'default' })
        if (!defaultCategory) {
            return res.status(404).send({ message: 'default category not found' });
        }

        const product = await Product.find({ category: categoryId });

        await Product.updateMany({ category: categoryId }, { $set: { category: defaultCategory._id } })

        await Category.findByIdAndDelete(categoryId)

        return res.send({ message: 'Category deleted and Product reassigned successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting category and updating Product', err })
    }
}