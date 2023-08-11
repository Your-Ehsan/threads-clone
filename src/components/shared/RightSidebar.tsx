import { fetchCommunities } from "@/src/lib/actions/community.actions";
import UserCard from "../cards/UserCard";
import { fetchUsers } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const RightSidebar = async () => {
  const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 }),
    _user = await currentUser(),
    { isNext, users } = await fetchUsers({
      userId: _user?.id,
      searchString : "",
      pageNumber : 1,
      pageSize : 20,
      sortBy : "desc",
    });
  if (!_user) return null;
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 justify-start flex-col">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>

        <div className="mt-7 flex flex-col gap-9">
          {suggestedCOmmunities.communities.length > 0 ? (
            <>
              {suggestedCOmmunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-1 justify-start flex-col">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div className="mt-7 flex flex-col gap-10">
          {users.length > 0 ? (
            <>
              {users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
