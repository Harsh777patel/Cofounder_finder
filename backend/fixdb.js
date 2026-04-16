require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    try {
        await User.updateMany(
            { role: { $in: ['Founder', 'Company Owner'] } },
            { $set: { accountType: 'company' } }
        );
        const users = await User.find({ accountType: 'company' });
        console.log('Admins:', users.map(u => ({ email: u.email, accountType: u.accountType, role: u.role })));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
});
