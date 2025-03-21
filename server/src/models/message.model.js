import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        text: {
            type: String,
            default: '',
        },
        images: [{
            type: String,
            default: '',
        }],
          
    },{timestamps: true}
);

export const Message = mongoose.model('Message', messageSchema);


