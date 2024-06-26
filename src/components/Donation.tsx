import { useState, type FC } from "react";
import { Portal } from "~/components/utils/Portal";
import useDebounce from "~/hooks/useDebounce";
import { api } from "~/utils/api";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "~/contexts/Cart";
import { type EndaomentOrg } from "~/types/endaoment";
import Link from "next/link";

export const Donation: FC = () => {
  const { cart, addItem } = useCartContext();
  const [query, setQuery] = useState<string>();
  const debounceQuery = useDebounce(query, 500);
  const { data: causes, isLoading: causesIsLoading } = api.endaoment.search.useQuery({
    searchTerm: debounceQuery ?? 'paws',
    claimedStatus: 'claimed',
    count: 5,
    offset: 0,
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const addToCart = (cause: EndaomentOrg) => {
    if (cart.find(item => item.id === cause.id)) return;
    addItem({
      id: cause.id,
      address: cause.endaomentUrl,
      decimals: 18,
      symbol: cause.ein,
      name: cause.name,
      usdAmountDesired: 1,
      price: 1,
      img: cause.logoUrl,
      isDonation: true,
    });
  };

  const Cause: FC<{ cause: EndaomentOrg }> = ({ cause }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
      <div className="w-full">
        <div className="flex items-start gap-2 overflow-x-auto">
          <Image
            src={cause.logoUrl}
            alt={cause.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div 
            className="flex overflow-x-auto flex-col cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-bold">{cause.name}</span>
            <span className={`text-sm ${isExpanded ? '' : 'truncate'}`}>
              {cause.description}
            </span>
          </div>
          <button 
            className="btn btn-sm"
            onClick={() => {
              addToCart(cause);
              // close the modal
              document.getElementById('donation_modal')?.click();
            }}
          >
            Donate
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <label htmlFor="donation_modal" className="btn btn-ghost btn-sm">
        <Image
          src={`/images/endaoment.png`}
          alt="Endaoment"
          width={20}
          height={20}
          className="rounded-full"
        />
        Give $1 to {cart.some(item => item.isDonation) ? 'another' : 'a'} cause?
      </label>

      <Portal>
        <input type="checkbox" id="donation_modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle" role="dialog">
          <div className="modal-box relative">
            <label htmlFor="donation_modal" className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4">
              <XMarkIcon className="h-6 w-6" />
            </label>

            <h3 className="text-xl font-bold flex items-center gap-2">
              <Image
                src={`/images/endaoment.png`}
                alt="Endaoment"
                width={20}
                height={20}
                className="rounded-full"
              />
              Give to a cause!
            </h3>
            <p className="pt-4 pb-2 text-sm">
              Search for a cause that matters to you!
            </p>
            <div className="form-control mb-4">
              <input
                type="text"
                className="input input-bordered"
                placeholder="Search for a cause"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-6 h-40 overflow-y-auto">
              {causesIsLoading && (Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-start gap-2 w-full">
                  <div className="bg-base-300 w-14 rounded-full h-14" />
                  <div className="flex flex-col gap-2">
                    <div className="bg-base-300 w-20 rounded h-6" />
                    <div className="bg-base-300 rounded h-4 w-80" />
                  </div>
                  <div className="bg-base-300 rounded-xl h-8 w-20" />
                </div>
              )))}
              {causes?.map((cause) => (
                <Cause key={cause.id} cause={cause} />
              ))}
            </div>
            <div className="modal-action mt-3">
              <Link href="https://endaoment.org" target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost">
                <Image
                  src={`/images/endaoment.png`}
                  alt="Endaoment"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-xs">Powered by Endaoment</span>
              </Link>
          </div>
          </div>
        </div>
      </Portal>
    </>
  )
};

export default Donation;