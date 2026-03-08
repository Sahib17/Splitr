import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UserGroups } from "@/services/groupService";
import React, { useEffect, useState } from "react";

const Groups = () => {
  const [group, setGroup] = useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await UserGroups();
        setGroup(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroups();
  }, []);
  const invitedGroups = group.filter((g) => g.status === "INVITED");
  const joinedGroups = group.filter((g) => g.status === "JOINED");
  return (
    <>
    <Navbar />
      <div>
        {group.length === 0 ? (
          <p>No groups yet</p>
        ) : (
          <>
            <h2>Joined Groups</h2>
            {joinedGroups.length === 0 ? (
              <p>No joined groups</p>
            ) : (
              joinedGroups.map((g) => (
                <div key={g.groupId._id}>
                    <div>Group Name: {g.groupId.name}</div>
                    <div>Membership Status: {g.role}</div>
                    <div><Button>Open</Button></div>
                    <div><Button>Settle</Button></div>
                    <div>Amount Owed: </div>
                    </div>
              ))
            )}

            <h2>Invited Groups</h2>
            {invitedGroups.length === 0 ? (
              <p>No invitations</p>
            ) : (
              invitedGroups.map((g) => (
                <div key={g.groupId._id}>
                    <div>Group Name: {g.groupId.name}</div>
                    <div><Button>Join</Button><Button>Reject</Button></div>
                    </div>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Groups;
