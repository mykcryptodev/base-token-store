import { type FC } from "react";
import { Portal } from "~/components/utils/Portal";
import Image from "next/image";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { type Collection } from "~/types/simpleHash";

type Props = {
  collection: Collection;
}

export const VerifiedCollectionModal: FC<Props> = ({ collection }) => {
  return (
    <>
      <label 
        htmlFor={`${collection.collection_id}-verified-modal`}
      >
        <CheckBadgeIcon className="h-4 w-4 text-primary cursor-pointer" />
      </label>

      <Portal>
        <input type="checkbox" id={`${collection.collection_id}-verified-modal`} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle" role="dialog">
          <div className="modal-box relative overflow-hidden">
            <label htmlFor={`${collection.collection_id}-verified-modal`} className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4">
              <XMarkIcon className="h-6 w-6" />
            </label>
            <div className="flex items-start gap-2 flex-nowrap whitespace-break-spaces">
              <Image
                src={collection.collection_details.image_url}
                alt={collection.collection_details.name}
                width={100}
                height={100}
                className="object-cover rounded-full w-6 h-6"
              />
              {collection.collection_details.name} is verified on OpenSea
            </div>
          </div>
        </div>
      </Portal>
    </>
  )
};

export default VerifiedCollectionModal;