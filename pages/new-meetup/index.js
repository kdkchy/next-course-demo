import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import Head from 'next/head'

function NewMeetupPage(){
    const router = useRouter()
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const result = await response.json()
        console.log(result)
        router.push('/')
    }
    return (
        <Fragment>
            <Head>
                <title>Add New Meetup</title>
                <meta name='description' content='add your new meetup'/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    );
}

export default NewMeetupPage;