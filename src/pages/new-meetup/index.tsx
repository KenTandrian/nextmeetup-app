// our-domain.com/new-meetup
import React, { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import NotificationContext from '@/store/notification-context';

const NewMeetupPage = () => {
    const router = useRouter();
    const notificationCtx = useContext(NotificationContext);
    const showNotif = notificationCtx.showNotification;

    const addMeetupHandler = async (enteredMeetupData: Omit<IMeetup, "id">) => {
        showNotif({
            title: 'Pending...',
            message: 'Sending your data',
            status: 'pending'
        });
        console.log(enteredMeetupData);

        const resp = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();

        if (resp.ok) {
            showNotif({
                title: 'Success!',
                message: 'Data sent successfully!',
                status: 'success'
            });
            console.log(data);
            router.push('/');
        } else {
            showNotif({
                title: 'Error!',
                message: data.message || 'Data sent successfully!',
                status: 'error'
            });
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta name="description" content="Add your own meetups and create amazing networking opportunities!" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}

export default NewMeetupPage;