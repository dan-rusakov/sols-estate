import Head from "next/head";
import CreateTrackingForm from "~/components/CreateTrackingForm/CreateTrackingForm";
import Header from "~/components/Header";

export default function CreateTracking() {
  return (
    <>
      <Head>
        <title>
          Sols estate: search and share estates requests - create tracking
        </title>
        <meta
          name="description"
          content="Tailor your real estate experience with personalized tracking on Sols Estate. Create tracking by specifying property location, price, room count, and commission. Select your preferred messengers for instant notifications. Track specific requests from other agents automatically and receive alerts when new matches are found."
        />
        <meta
          name="keywords"
          content="Request tracking, property preferences, agent alerts, tracking criteria, automated notifications, location tracking, price range tracking, room count preferences, commission monitoring, tracking setup, messenger selection, personalized experience, agent collaboration, real estate tracking, Sols Estate"
        />
      </Head>
      <Header />
      <CreateTrackingForm />
    </>
  );
}
