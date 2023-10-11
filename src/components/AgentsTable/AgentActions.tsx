import { Button, CircularProgress } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BlockIcon from "@mui/icons-material/Block";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { type $Enums } from "@prisma/client";

interface AgentActionsProps {
  agentId: string;
  status: $Enums.AgentPersonalStatusType;
}

export default function AgentActions(props: AgentActionsProps) {
  const { agentId, status } = props;

  const { data: session } = useSession();
  const ctx = api.useContext();

  const { isLoading: isAddingToFavourites, mutate: addToFavoutires } =
    api.agents.addAgentToFavourites.useMutation({
      onSuccess() {
        void ctx.agents.getAllAgents.invalidate();
      },
    });
  const { isLoading: isRemovingFromFavourites, mutate: removeFromFavoutires } =
    api.agents.removeAgentFromFavourites.useMutation({
      onSuccess() {
        void ctx.agents.getAllAgents.invalidate();
      },
    });

  const { isLoading: isAddingToBlacklist, mutate: addToBlacklist } =
    api.agents.addAgentToBlacklist.useMutation({
      onSuccess() {
        void ctx.agents.getAllAgents.invalidate();
      },
    });
  const { isLoading: isRemovingFromBlacklist, mutate: removeFromBlacklist } =
    api.agents.removeAgentFromBlacklist.useMutation({
      onSuccess() {
        void ctx.agents.getAllAgents.invalidate();
      },
    });

  const addToFavoutiresHandler = () => {
    if (status === "FAVOURITE") {
      removeFromFavoutires({
        userId: session?.user.id ?? "",
        agentId,
      });
    } else {
      addToFavoutires({
        userId: session?.user.id ?? "",
        agentId,
      });
    }
  };

  const addToBlacklistHandler = () => {
    if (status === "BLOCKED") {
      removeFromBlacklist({
        userId: session?.user.id ?? "",
        agentId,
      });
    } else {
      addToBlacklist({
        userId: session?.user.id ?? "",
        agentId,
      });
    }
  };

  return (
    <div className="flex gap-2">
      {status !== "BLOCKED" && (
        <Button
          size="small"
          variant={status === "FAVOURITE" ? "contained" : "outlined"}
          color="indigo"
          className={status === "FAVOURITE" ? "bg-indigo-700" : ""}
          disableElevation
          title="Add to favourites"
          onClick={addToFavoutiresHandler}
        >
          {isAddingToFavourites || isRemovingFromFavourites ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <StarOutlineIcon />
          )}
        </Button>
      )}
      {status !== "FAVOURITE" && (
        <Button
          size="small"
          color="indigo"
          disableElevation
          variant={status === "BLOCKED" ? "contained" : "outlined"}
          className={status === "BLOCKED" ? "bg-indigo-700" : ""}
          title="Add to blacklist"
          onClick={addToBlacklistHandler}
        >
          {isAddingToBlacklist || isRemovingFromBlacklist ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <BlockIcon />
          )}
        </Button>
      )}
    </div>
  );
}
