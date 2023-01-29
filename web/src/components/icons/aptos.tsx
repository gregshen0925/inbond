import Image from 'next/image';
import AptosLogo from '../../assets/images/aptos.png';
import AptosLogoDark from '../../assets/images/aptos-dark.png';
import { useIsDarkMode } from '../../lib/hooks/use-is-dark-mode';

export function Aptos() {
  const { isDarkMode } = useIsDarkMode();
  return (
    <div className="ml-[-2] pr-2 pt-1">
      <Image
        src={isDarkMode ? AptosLogo : AptosLogoDark}
        alt="aptos logo"
        height={20}
        width={20}
      />
    </div>
  );
}
