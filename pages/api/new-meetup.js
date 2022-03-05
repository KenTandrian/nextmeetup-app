// /api/new-meetup
// import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../lib/db-util";

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;
    const { title, image, address, description } = data;

    if (!title || !image || !address || !description){
        res.status(403).json({ message: 'Invalid input!' });
        return;
    }

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    data._id = result.insertedId;
    console.log(result, data);
    client.close();

    res.status(201).json({ message: 'Meetup Inserted!' });
}

export default handler;