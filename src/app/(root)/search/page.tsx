import UserCard from "@/src/components/cards/UserCard";
import { fetchUsers } from "@/src/lib/actions/user.actions";

const Search = async () => {
  const { isNext, users } = await fetchUsers({
    userId: "",
    pageNumber: 1,
    pageSize: 20,
    searchString: "",
    sortBy: "desc",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {users.length === 0 ? (
          <p className="no-result">No Users Found ¯\_(ツ)_/¯ </p>
        ) : (
          <div>
            {users.map((person) => {
              return (
                <UserCard
                  key={person._id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType={"User"}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
