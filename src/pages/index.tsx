import React, { Fragment } from "react";
import Head from "next/head";

import MeetupList from '../components/meetups/MeetupList';
import { connectToDatabase } from "../lib/db-util";

const HomePage = (props) => {
    const loadedMeetups = props.meetups;

    return (
        <Fragment>
            <Head>
                <title>React Meetups!</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>
            <MeetupList meetups={loadedMeetups} />
        </Fragment>
    )
}

// export const getServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export const getStaticProps = async (context) => {
    // Fetch data from an API
    const client = await connectToDatabase();
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage;