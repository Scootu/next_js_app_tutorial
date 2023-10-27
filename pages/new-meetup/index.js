import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

export default function NewMeetup() {
  const router = useRouter();
  async function addNewMeetup(entredMeetupData) {
    const responce = await fetch("api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entredMeetupData),
    });
    const request = await responce.json();
    console.log("json : ", request);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>New React meetups!</title>
        <meta
          typeof="description"
          content="Make best new react meetups in your own by the easyt way !"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addNewMeetup} />;
    </Fragment>
  );
}
