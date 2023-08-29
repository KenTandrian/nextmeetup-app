// /api/new-meetup
import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { connectToDatabase } from "@/lib/db-util";

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not Allowed!' });
        return;
    }

    const data = req.body;
    const { title, image, address, description } = data;

    if (!title || title.trim() === '' || !image || image.trim() === ''|| !address || address.trim() === ''|| !description || description.trim() === ''){
        res.status(422).json({ message: 'Invalid input!' });
        return;
    }

    // Connect to MongoDB
    let client: MongoClient;
    try {
        client = await connectToDatabase();
    } catch (err) {
        res.status(500).json({ message: 'Connecting to the DB failed.' });
        return;
    }
    
    // TRY SENDING NEW DATA
    try {
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        data._id = result.insertedId;
        console.log(result, data);

        res.status(201).json({ message: 'Meetup Inserted!' });
    } catch (err) {
        res.status(500).json({ message: 'Inserting failed.'});
    }

    client.close();
}

export default handler;