import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

blacklistTokenSchema.index(
    {createdAt: 1},
    {expireAfterSeconds: 300},
);

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

export default BlacklistToken;