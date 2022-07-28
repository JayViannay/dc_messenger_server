import ConversationModel from "../models/ConversationModel.js";
import UserModel from "../models/UserModel.js";

const conversationAllreadyExist = async (participants) => {
    let conversationExist = false;

    const current_user_conversations = await UserModel.getConversations(participants[0]);

    current_user_conversations.forEach( async (conversation) => {
        const convParticipants = await ConversationModel.getParticipants(conversation.conversation_id);
        const idsParticipants = constParticipants.map(participant => participant.id);

        if (idsParticipants.lenght === 2 && idsParticipants.includes(participants[0]) && idsParticipants.includes(participants[1]))
        {
            conversationExist = conversation.conversation_id;
        }
    });

    return conversationExist;
    //recuperer les conversation du user courant et du destinataire
    //comparer les resultats et si 

}
export default { conversationAllreadyExist };