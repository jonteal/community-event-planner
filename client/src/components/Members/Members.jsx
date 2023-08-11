import { gql, useQuery } from "@apollo/client";

const GET_MEMBERS = gql`
  query getMembers {
    members {
      id
      username
      email
      phone
    }
  }
`;

const Members = () => {
  const { loading, data, error } = useQuery(GET_MEMBERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <>
      {!loading && !error && <h1>Members</h1>}

      <div>
        {data.members.map((member) => (
          <div>
            <p>{member.username}</p>
            <p>{member.email}</p>
            <p>{member.phone}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Members;
