import User from '../src/user/user.model.js'
import { checkPassword } from '../utils/encrypt.js'

export const validatePassword = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { currentPassword } = req.body;

        if (!currentPassword) {
            return res.status(400).send({ message: 'Current password is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await checkPassword(user.password, currentPassword);
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect password' });
        }

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error validating password', err });
    }
}
