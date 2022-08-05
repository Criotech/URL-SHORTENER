import { connect, ConnectOptions } from "mongoose";

type ConnectionOptionsExtend = {
    useNewUrlParser: boolean
    useUnifiedTopology: boolean,
}

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGO_URI!;
    const options: ConnectOptions & ConnectionOptionsExtend = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log("MongoDB connected")
  } catch (err: any) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;