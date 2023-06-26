import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from "../../components/meetups/MeetupDetail"
import { Fragment } from 'react';
import Head from 'next/head'

function MeetupDetails(props){
    return (
        <Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name='description' content={props.description}/>
            </Head>
            <MeetupDetail
                image={props.image}
                title={props.title}
                description={props.description}
                address={props.address}
                id={props.id}
            />
        </Fragment>
    )
}

export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://nextjs:2UQWlwSzqnSXI5Fo@cluster0.una1daq.mongodb.net/meetup_app?retryWrites=true&w=majority');
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const meetupsId = await meetupsCollection.find({}, {_id: 1}).toArray()

    client.close()
    return {
        fallback: false,
        paths: meetupsId.map(meetupId => ({
            params: {meetupId: meetupId._id.toString()}
        }))
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId
    const client = await MongoClient.connect('mongodb+srv://nextjs:2UQWlwSzqnSXI5Fo@cluster0.una1daq.mongodb.net/meetup_app?retryWrites=true&w=majority');
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const meetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId
    )})
    client.close()
    return {
        props: {
            id: meetup._id.toString(),
            image: meetup.image,
            title: meetup.title,
            description: meetup.description,
            address: meetup.address,
        }
    }
}

export default MeetupDetails;