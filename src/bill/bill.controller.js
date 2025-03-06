import Bill from "./bill.model.js";

export const save = async (req, res) => {
    try {
        const data = req.body;
        const bill = new Bill(data);
        await bill.save();
        return res.send({
            success: true,
            message: `Bill for user ${bill.user} saved successfully`,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when adding bill',
            err,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const bills = await Bill.find()
            .skip(skip)
            .limit(limit);

        if (bills.length === 0)
            return res.status(404).send({ message: 'Bills not found', success: false });

        return res.send({
            success: true,
            message: 'Bills found: ',
            bills: bills,
            total: bills.length,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err,
        });
    }
};  

export const getById = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const { billId } = req.params; // Asumiendo que pasas el ID del Bill en los parámetros

        // Buscar el Bill por ID
        const bill = await Bill.findById(billId)
            .skip(skip)
            .limit(limit);

        if (!bill) {
            return res.status(404).send({ message: 'Bill not found', success: false });
        }

        return res.send({
            success: true,
            message: 'Bill found',
            bill: bill
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
}