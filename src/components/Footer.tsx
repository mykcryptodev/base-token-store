import { type FC } from "react";
import { APP_DESCRIPTION, APP_NAME } from "~/constants";
import Image from "next/image";
import Link from "next/link";
import Logo from "~/components/Logo";
import { useTheme } from "next-themes";

export const Footer: FC = () => {
  const { theme } = useTheme();
  const links = [
    {
      label: "About Smart Wallet",
      href: "https://www.smartwallet.dev?utm_source=basetokenstore",
    },
    {
      label: "Join the Buildathon",
      href: "https://onchain-summer.devfolio.co?utm_source=basetokenstore",
    },
    {
      label: "Onchain Summer",
      href: "https://www.base.org/onchainsummer?utm_source=basetokenstore",
    },
    {
      label: "Build on Base",
      href: "https://www.base.org?utm_source=basetokenstore",
    }
  ];

  type BuildersProps = { className?: string };
  const Builders: FC<BuildersProps> = ({ className }) => (
    <div className={className}>
      <div className="flex sm:flex-row flex-col items-center gap-4 mt-4">
        <Link href="https://warpcast.com/myk" className="flex items-center gap-1" target="_blank" rel="noreferrer">
          <Image src="/images/myk.webp" alt="Myk.eth" className="h-6 w-6 rounded-full" width={24} height={24} />
          <span className="text-xs">Built by @Myk.eth</span>
        </Link>
        <Link href="https://warpcast.com/baseddesigner.eth" className="flex items-center gap-1" target="_blank" rel="noreferrer">
          <Image src="/images/baseddesigner.png" alt="Based Designer" className="h-6 w-6 rounded-full" width={24} height={24} />
          <span className="text-xs">Designed by @baseddesigner.eth</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden mx-auto bg-neutral text-neutral-content min-h-96 relative">
      <div className="flex sm:flex-row flex-col gap-4 justify-between w-full p-20 max-w-7xl mx-auto mb-40">
        <div className="flex flex-col gap-4">
          <div className="w-full justify-start">
            <Logo
              shapesFill={`${theme === 'dark' ? '#C9CCD5' : '#FFFFFF'}`}
              backgroundFill={`${theme === 'dark' ? '#000000' : '#1E4FFD'}`}
              width={70}
              height={25}
            />
          </div>
          <div className="text-4xl tracking-tighter">{APP_NAME}</div>
          <div className="text-sm -mt-3">{APP_DESCRIPTION}</div>
          <Builders className="sm:flex hidden" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="https://www.base.org/onchainsummer?utm_source=basetokenstore" target="_blank" rel="noreferrer">
            <Image src="/images/onchainsummer.png" alt="Onchain Summer" className="h-16 w-fit" width={200} height={200} />
          </Link>
          <Link href="https://github.com/mykcryptodev/base-token-store" className="flex items-center gap-2 text-sm" target="_blank" rel="noreferrer">
            <Image src="/images/github.png" alt="Github" className="h-8 w-fit" width={50} height={50} />
            <div className="flex flex-col">
              <span>Open source license</span>
              <span>Clone on GitHub</span>
            </div>
          </Link>
          <Link href="https://www.complainonchain.xyz/mykcryptodev" className="text-sm items-center flex gap-2" target="_blank" rel="noreferrer">
            <Image src="/images/keren.webp" alt="Keren: Report an issue" className="h-8 w-fit" width={50} height={50} />
            <div className="flex flex-col">
              <span>Report an issue</span>
              <span className="text-xs opacity-50">by $keren</span>
            </div>
          </Link>
          <Builders className="sm:hidden flex" />
        </div>
      </div>
      <div style={{ backgroundImage: `url('/images/full-width-text.svg')` }} className={`w-full bg-center bg-no-repeat h-40 absolute -bottom-5 z-10 ${theme === 'dark' ? 'opacity-80' : ''}`} ></div>
    </div>
  )
};

export default Footer;