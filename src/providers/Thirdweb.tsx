import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

import { env } from "~/env";

export const client = createThirdwebClient({
  clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export const Thirdweb = ({ children } : { 
  children: React.ReactNode
 }) => {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  )
};

export default Thirdweb;