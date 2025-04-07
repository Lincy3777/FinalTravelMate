import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import getListings, { IListingsParams } from "../actions/getListings";
import ListingCard from "../components/listings/ListingCard";
import getCurrentUser from "../actions/getCurrentUser";
import { SafeListing, safeUser } from "../types";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings: SafeListing[] = await getListings(searchParams);
  const currentUser: safeUser | null = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
