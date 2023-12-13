const mongoose=require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database"));

const todosSchema = new mongoose.Schema({ 'name': { type: String, required: true }, 'isCompleted': { type: Boolean, default:false } });

module.exports=mongoose.model('Todos',todosSchema);