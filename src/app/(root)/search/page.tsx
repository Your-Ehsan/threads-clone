import UserCard from "@/src/components/cards/UserCard";
import Pagination from "@/src/components/shared/Pagination";
import SearchBar from "@/src/components/shared/SearchBar";
import { fetchUsers } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const Search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const _user = await currentUser(),
    { isNext, users } = await fetchUsers({
      userId: _user?.id,
      searchString: searchParams.q,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 20,
      sortBy: "desc",
    });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <SearchBar routeType='search' />
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
      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
};

export default Search;
