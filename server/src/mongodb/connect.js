import mongoose from 'mongoose';

function connect(callback) {
	mongoose.set('strictQuery', true);
	mongoose
		.connect(process.env.MONGODB_URL)
		.then(() => {
			console.log('Mongodb connection established');
			callback();
		})
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}

export default connect;
