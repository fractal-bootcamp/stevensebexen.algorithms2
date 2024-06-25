'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarLinkProps {
  href: string;
  name: string;
  currentUrl: string;
}
function NavBarLink(props: NavBarLinkProps) {
  return (
    <Link className='basis-20 text-center' href={props.href} style={{border: props.currentUrl === props.href ? 'solid 1px #f4878c' : 'none'}}>{props.name}</Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className='flex p-2 gap-2 items-center'>
      <NavBarLink href='/' name='Home' currentUrl={pathname} />
      <NavBarLink href='/sort' name='Sort' currentUrl={pathname} />
    </div>
  );
}