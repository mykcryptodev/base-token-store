import { type ComponentType, useEffect, type FC, useState } from 'react';
import { type GetServerSideProps } from 'next';
import { sharedGetServerSideProps } from '~/lib/getServerSidePropsUtil';
import { useCartContext } from "~/contexts/Cart";
import { useAdvertisementContext } from "~/contexts/Advertisement";
import { type Advertisement } from '~/types/advertisement';
import { type NFT } from 'thirdweb';

export interface WithServerSideProps {
  advertisement: Advertisement | null;
  referralNft: (Omit<NFT, 'id'> & { id: string }) | null;
}

export function withServerSideProps<P extends WithServerSideProps>(WrappedComponent: ComponentType<P>) {
  const ComponentWithServerSideProps: FC<P> = (props) => {
    const { updateReferralCode } = useCartContext();
    const { updateAdvertisement } = useAdvertisementContext();

    useEffect(() => {
      if (props.referralNft) {
        updateReferralCode(props.referralNft.id.toString());
      }
    }, [props.referralNft, updateReferralCode]);

    useEffect(() => {
      updateAdvertisement(props.advertisement);
    }, [props.advertisement, updateAdvertisement]);

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithServerSideProps;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return sharedGetServerSideProps(context);
};
