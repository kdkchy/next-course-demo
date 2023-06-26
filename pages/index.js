import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
import Head from 'next/head'

function HomePage(props){
    return (
        <Fragment>
            <Head>
                <title>Meetup</title>
                <meta name='description' content='Find your mate here'/>
            </Head>
        <MeetupList meetups={props.meetups}/>
        </Fragment>
    );
}

// export async function getServerSideProps(){
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://nextjs:2UQWlwSzqnSXI5Fo@cluster0.una1daq.mongodb.net/meetup_app?retryWrites=true&w=majority');
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()

    client.close()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image
            }))
        },
        revalidate: 1
    }
}

export default HomePage;

//test ssh
//test ulang downlod