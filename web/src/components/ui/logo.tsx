import { useRouter } from 'next/router';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from '@/assets/images/injoylabslogo-dark.png';
import darkLogo from '@/assets/images/injoylabslogo-light.png';
import routes from '@/config/routes';
import { LAYOUT_OPTIONS } from '@/lib/constants/layout-options';

export default function Logo() {
  const router = useRouter();
  const {
    query: { layout },
  } = router;
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <AnchorLink
      href={{
        pathname: routes.home,
        ...(layout !== LAYOUT_OPTIONS.MODERN &&
          layout !== undefined && {
            query: {
              layout,
            },
          }),
      }}
      className="flex w-28 outline-none sm:w-32 4xl:w-36"
    >
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image src={darkLogo} alt="Criptic" priority />
        )}
        {isMounted && !isDarkMode && (
          <Image src={lightLogo} alt="Criptic" priority />
        )}
      </span>
    </AnchorLink>
  );
}
