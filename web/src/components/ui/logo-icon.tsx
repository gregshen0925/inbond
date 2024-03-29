import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from '@/assets/images/inbond-logo.png';
import darkLogo from '@/assets/images/inbond-logo.png';

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image src={darkLogo} alt="InJoyLabs" priority />
        )}
        {isMounted && !isDarkMode && (
          <Image src={lightLogo} alt="InJoyLabs" priority />
        )}
      </span>
    </div>
  );
};

export default Logo;
