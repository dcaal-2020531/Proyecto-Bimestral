import Category from '../src/category/category.model.js';

const createCategories = async () => {
    try {
        const categories = [
            { name: 'default', description: 'Default category' },
        ];

        for (const category of categories) {
            const existingCategory = await Category.findOne({ name: category.name });
            if (!existingCategory) {
                await new Category(category).save();
            }
        }
        
        console.log('Categories initialized');
    } catch (err) {
        console.error('Error initializing categories');
    }
};

export default createCategories;
