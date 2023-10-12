import Head from "next/head";
import CreateDeclarationForm from "~/components/CreateDeclarationForm/CreateDeclarationForm";
import Header from "~/components/Header";

export default function CreateDeclaration() {
  return (
    <>
      <Head>
        <title>
          Sols estate: search and share estates requests - create request
        </title>
        <meta
          name="description"
          content="Empower your real estate journey with Sols Estate. As a registered agent, create new listing requests for villas, condos, and townhouses, and connect with clients seamlessly. Unite with other agents in one place and provide a personalized experience for every user. Start your next real estate adventure here."
        />
        <meta
          name="keywords"
          content="Real estate requests, agent requests, property listings, villa requests, condo requests, townhouse requests, agent listing, request creation, personalized experience, real estate platform, agent unity, property sharing, real estate marketplace, request submission, agent networking, property matchmaking, Sols Estate"
        />
      </Head>
      <Header />
      <CreateDeclarationForm />
    </>
  );
}
