import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";
export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups!</title>
        <meta
          name="description"
          content="Browse a huge list of best React meetups list in the website!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_ARRAY,
//     },
//   };
// }
export async function getStaticProps() {
  //fetch data
  const uri =
    "mongodb+srv://anes1234:EPJjrR3Op6Y6ipVg@cluster0.9pzjkap.mongodb.net/?retryWrites=true&w=majority";
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri);

  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          description: meetup.description,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
}
