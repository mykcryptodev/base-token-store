import { useState, type FC } from "react";
import { Portal } from "~/components/utils/Portal";
import useDebounce from "~/hooks/useDebounce";
import { api } from "~/utils/api";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "~/contexts/Cart";
import { type EndaomentOrg } from "~/types/endaoment";

export const Donation: FC = () => {
  const { cart, addItem } = useCartContext();
  const [query, setQuery] = useState<string>('paws');
  const debounceQuery = useDebounce(query, 500);
  const { data: causes, isLoading: causesIsLoading } = api.endaoment.search.useQuery({
    searchTerm: debounceQuery,
    claimedStatus: 'claimed',
    count: 5,
    offset: 0,
  }, {
    enabled: !!debounceQuery,
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

  return (
    <>
      <label htmlFor="donation_modal" className="btn btn-ghost btn-sm">
        Give $1 to {cart.some(item => item.isDonation) ? 'another' : 'a'} cause?
      </label>

      <Portal>
        <input type="checkbox" id="donation_modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle" role="dialog">
          <div className="modal-box relative">
            <label htmlFor="donation_modal" className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4">
              <XMarkIcon className="h-6 w-6" />
            </label>

            <h3 className="text-lg font-bold">Give to a cause!</h3>
            <p className="py-4">
              Select a cause that matters to you!
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
            {causesIsLoading && <p>Loading...</p>}
            <div className="flex flex-col gap-6">
              {causes?.map((cause) => (
                <div key={cause.id} className="w-full max-h-40">
                  <div className="flex items-start gap-2">
                    <Image
                      src={cause.logoUrl}
                      alt={cause.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col overflow-x-hidden">
                      <span className="font-bold">{cause.name}</span>
                      <span className="text-sm truncate">{cause.description}</span>
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
              ))}
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
};

export default Donation;