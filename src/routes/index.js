import UserController from '../controllers/UserController.js';
import ConversationController from '../controllers/ConversationController.js';
import MessageController from '../controllers/MessageController.js';

export default (app) => {
    app.use('/api/users', UserController);
    app.use('/api/conversations', ConversationController);
    app.use('/api/messages', MessageController);
};