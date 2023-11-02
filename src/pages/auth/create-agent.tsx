import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { type AgentType } from "@prisma/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import AgentTypeFilter from "~/components/CreateAgentAgentTypeFilter/CreateAgentAgentTypeFilter";
import LegalAddressFilter from "~/components/CreateAgentLegalAddressFilter/CreateAgentLegalAddressFilter";
import { api } from "~/utils/api";

export default function CreateAgent() {
  const router = useRouter();
  const {
    isLoading: isCreatingAgent,
    error: createAgentError,
    mutate,
  } = api.agents.createAgent.useMutation({
    onSuccess: () => {
      void router.replace("/declarations");
    },
  });
  const { data: session, status } = useSession();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [selectedAgentType, setSelectedAgentType] = useState<AgentType>();
  const [selectedAgentTypeError, setSelectedAgentTypeError] = useState(false);
  const [agencyName, setAgencyName] = useState<string>();
  const [agencyNameError, setAgencyNameError] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [selectedRegionError, setSelectedRegionError] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedCityError, setSelectedCityError] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>();
  const [selectedDistrictError, setSelectedDistrictError] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [lineLink, setLineLink] = useState("");
  const [viberLink, setViberLink] = useState("");

  const validateCreatingAgent = () => {
    setFirstNameError(!firstName);
    setLastNameError(!lastName);
    setSelectedAgentTypeError(!selectedAgentType);
    setAgencyNameError(!agencyName && selectedAgentType === "AGENCY");
    setSelectedRegionError(!selectedRegion);
    setSelectedCityError(!selectedCity);
    setSelectedDistrictError(!selectedDistrict);

    if (
      !firstName ||
      !lastName ||
      !selectedAgentType ||
      !selectedRegion ||
      !selectedCity ||
      !selectedDistrict
    ) {
      return false;
    }

    if (selectedAgentType === "AGENCY" && !agencyName) {
      return false;
    }

    if (!session?.user.id) {
      return false;
    }

    return true;
  };

  const onCreateAgentSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (validateCreatingAgent()) {
      mutate({
        userId: session!.user.id,
        firstName,
        lastName,
        type: selectedAgentType!,
        agencyName: agencyName ?? null,
        district: selectedDistrict!,
        city: selectedCity!,
        region: selectedRegion!,
        telegramLink,
        whatsappLink,
        viberLink,
        lineLink,
      });
    }
  };

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <Head>
        <title>
          Sols estate: search and share estates requests - create agent
        </title>
        <meta
          name="description"
          content="Join Sols Estate as a real estate agent. Create your agent profile by providing essential information, including legal address, agent name, and work status (freelance or agency-affiliated). Customize your profile with agency details and messenger links for seamless communication in one place."
        />
        <meta
          name="keywords"
          content="Agent profile creation, real estate agent information, legal address, agent name, free agent, agency-affiliated agent, agency name, messenger links, personalized experience, agent networking, property requests, agent collaboration, property matchmaking, Sols Estate"
        />
      </Head>
      <div className="ml-auto mr-auto flex w-full max-w-[400px] flex-col py-20 sm:py-12">
        <h1 className="mb-2 text-3xl font-bold text-neutral-900 sm:text-2xl">
          Create your account
        </h1>
        <p className="mb-10 text-sm font-normal text-neutral-500">
          Create agent account to manage requests
        </p>
        <form className="flex flex-col gap-y-6" onSubmit={onCreateAgentSubmit}>
          <TextField
            id="first-name"
            label="First name"
            type="text"
            name="first-name"
            variant="outlined"
            value={firstName}
            onChange={(evt) => setFirstName(evt.target.value)}
            className="w-full"
            required
            error={firstNameError}
          />
          <TextField
            id="last-name"
            label="Last name"
            type="text"
            name="last-name"
            variant="outlined"
            value={lastName}
            onChange={(evt) => setLastName(evt.target.value)}
            className="w-full"
            required
            error={lastNameError}
          />
          <AgentTypeFilter
            selectedAgentType={selectedAgentType}
            setSelectedAgentType={setSelectedAgentType}
            selectedAgentTypeError={selectedAgentTypeError}
            agencyName={agencyName}
            setAgencyName={setAgencyName}
            agencyNameError={agencyNameError}
          />
          <div className="pt-4">
            <p className="text-md mb-1 font-normal text-neutral-700">
              Legal address
            </p>
            <p className="mb-5 text-sm font-normal text-neutral-500">
              We will use this information to improve requests search results
            </p>
            <div className="flex flex-col gap-y-6">
              <LegalAddressFilter
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedRegionError={selectedRegionError}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedCityError={selectedCityError}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                selectedDistrictError={selectedDistrictError}
              />
            </div>
          </div>
          <div className="py-4">
            <p className="text-md mb-1 font-normal text-neutral-700">
              Messengers links
            </p>
            <p className="mb-5 text-sm font-normal text-neutral-500">
              Other agents will use these links to text you about requests
            </p>
            <div className="flex flex-col gap-y-6">
              <TextField
                id="whatsapp-link"
                label="Whats app link"
                type="text"
                name="whatsapp-link"
                variant="outlined"
                value={whatsappLink}
                onChange={(evt) => setWhatsappLink(evt.target.value)}
                className="w-full"
              />
              <TextField
                id="telegram-link"
                label="Telegram link"
                type="text"
                name="telegram-link"
                variant="outlined"
                value={telegramLink}
                onChange={(evt) => setTelegramLink(evt.target.value)}
                className="w-full"
              />
              <TextField
                id="viber-link"
                label="Viber link"
                type="text"
                name="viber-link"
                variant="outlined"
                value={viberLink}
                onChange={(evt) => setViberLink(evt.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <Button
            variant="contained"
            type="submit"
            color="indigo"
            className="w-full bg-indigo-700 normal-case"
            size="large"
            disableElevation
            disabled={isCreatingAgent}
            endIcon={
              isCreatingAgent && <CircularProgress size={16} color="inherit" />
            }
          >
            Save
          </Button>
          {createAgentError && (
            <Alert severity="error">{createAgentError.message}</Alert>
          )}
        </form>
      </div>
    </>
  );
}
