import Image from 'next/image';
import SuiLogo from '../../assets/images/sui.png';

export function Sui() {
  return (
    <div className="ml-[-4px] pt-1">
      <Image src={SuiLogo} alt="aptos logo" height={30} width={30} />
    </div>
  );
}
