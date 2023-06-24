import React, { Fragment } from "react";
import { ObjectId } from "mongodb";
import Head from "next/head";

import MeetupDetail from "@/components/meetups/MeetupDetail";
import { connectToDatabase } from "@/lib/db-util";
import { GetStaticPropsContext } from "next";

// const DUMMY_MEETUP = {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Stadtbild_K%C3%B6ln_%2850MP%29.jpg/1024px-Stadtbild_K%C3%B6ln_%2850MP%29.jpg',
//     address: 'Some Address 10, 12345 Some City',
//     description: 'This is a second meetup!'
// }

const MeetupDetails = (props) => {
    const meetupData = props.meetupData;
    
    return (
        <Fragment>
            <Head>
                <title>{meetupData.title}</title>
                <meta name="description" content={meetupData.description} />
            </Head>
            <MeetupDetail {...meetupData} />
        </Fragment>
    )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const meetupId = context.params.meetupId as string;

    const client = await connectToDatabase();
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup?._id.toString(),
                title: selectedMeetup?.title,
                address: selectedMeetup?.address,
                image: selectedMeetup?.image,
                description: selectedMeetup?.description
            }
        }
    }
}

export const getStaticPaths = async () => {
    const client = await connectToDatabase();
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray(); // Only fetch ID
    client.close()

    return {
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
        fallback: 'blocking'
    }
}

export default MeetupDetails;