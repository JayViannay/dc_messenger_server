import ConversationModel from '../models/ConversationModel.js';
import MessageModel from '../models/MessageModel.js';
import UserModel from '../models/UserModel.js';

const newConversation = async (participants, req) => {
    const newConversationId = await ConversationModel.add();
    participants.forEach(async participant => {
        await ConversationModel.addParticipant(newConversationId, participant);
    });
    const message = { author_id: req.body.author_id, conversation_id: newConversationId, content: req.body.content, created_at: req.body.created_at };
    const newMessageId = await MessageModel.add(message);
    await ConversationModel.updateLastMessageId(newConversationId, newMessageId);
    
    return newConversationId;
};

const conversationAlreadyExist = async (participants) => {
    console.log(participants);
    const current_user_conversations = await UserModel.getConversations(
        participants[0]
    );

    let convExist = false;
    for (let i = 0; i < current_user_conversations.length; i++) {
        const conversationParticipants = await ConversationModel.getParticipants(current_user_conversations[i].conversation_id);
        const idsParticipant = conversationParticipants.map(
            (participant) => participant.id.toString()
        );
       
        if (idsParticipant.length === 2) {
            if (idsParticipant.includes(participants[0]) === true && idsParticipant.includes(participants[1]) === true) {
                convExist = current_user_conversations[i].conversation_id;
            }
        } 
    }
    return convExist;
};

const updateConversation = async (req, convId) => {
    const message = { author_id: req.body.author_id, conversation_id: convId, content: req.body.content, created_at: req.body.created_at };
    const newMessageId = await MessageModel.add(message);
    await ConversationModel.updateLastMessageId(convId, newMessageId);
};

export default { newConversation, conversationAlreadyExist, updateConversation };