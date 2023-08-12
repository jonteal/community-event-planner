import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../graphql/queries/eventQueries";
import { GET_MEMBERS } from "../../graphql/queries/memberQueries";
import { ADD_EVENT } from "../../graphql/mutations/eventMutations";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [memberId, setMemberId] = useState("");

  const [addEvent] = useMutation(ADD_EVENT, {
    variables: {
      name,
      description,
      location,
      startingTime,
      endingTime,
      memberId,
    },
    update(cache, { data: { addEvent } }) {
      const { events } = cache.readQuery({ query: GET_EVENTS });
      cache.writeQuery({
        query: GET_EVENTS,
        data: { events: [...events, addEvent] },
      });
    },
  });
  const { loading, error, data } = useQuery(GET_MEMBERS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      description === "" ||
      location === "" ||
      startingTime === "" ||
      endingTime === "" ||
      memberId === ""
    ) {
      return alert("Please fill in all fields");
    }

    addEvent(name, description, location, startingTime, endingTime, memberId);

    setName("");
    setDescription("");
    setLocation("");
    setStartingTime("");
    setEndingTime("");
    setMemberId("");
  };

  if (loading) return null;
  if (error) return "Something went wrong";
  return (
    <div className="flex flex-col w-96">
      <h1>Create Event</h1>
      <div className="mb-3">
        <label className="form-label">Member</label>
        <select
          id="memberId"
          className="form-select"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        >
          <option value="">Select Member</option>
          {data.members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.username}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3 flex flex-col border p-3">
          <label className="form-label mt-2">Event Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            className="form-control border rounded-md px-2 py-1"
          />
          <label className="form-label mt-3">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="form-control border rounded-md px-2 py-1"
          ></textarea>
          <label className="form-label mt-2">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            type="text"
            className="form-control border rounded-md px-2 py-1"
          />
          <label className="form-label mt-2">Starting Time</label>
          <input
            value={startingTime}
            onChange={(e) => setStartingTime(e.target.value)}
            id="startingTime"
            type="text"
            className="form-control border rounded-md px-2 py-1"
          />
          <label className="form-label mt-2">Ending Time</label>
          <input
            value={endingTime}
            onChange={(e) => setEndingTime(e.target.value)}
            id="endingTime"
            type="text"
            className="form-control border rounded-md px-2 py-1"
          />
        </div>

        <button
          className="submit-btn border py-1 px-2 rounded-md bg-sky-600 text-zinc-100"
          type="submit"
          data-bs-dismiss="modal"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
