import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'senderType',
        },
        senderType: {
            type: String,
            // required: true,
            enum: ['User', 'GoogleUser'],
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'receiverType',
        },
        receiverType: {
            type: String,
            // required: true,
            enum: ['User', 'GoogleUser'],
        },
        text: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
          
    },{timestamps: true}
);

export const Message = mongoose.model('Message', messageSchema);


