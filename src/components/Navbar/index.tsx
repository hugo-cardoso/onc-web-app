import * as Styles from './styles';
import { useContext } from 'react';
import { useRouter } from 'next/router'
import { SearchContext } from '../../contexts/searchContext';

type NavItem = {
  onClick: () => void;
  icon: string;
  active: boolean;
};

export const Navbar = () => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);

  const changeRoute = (route: string) => router.push(route);

  const NAV_ITEMS: NavItem[] = [
    {
      onClick: () => changeRoute('/'),
      icon: 'home-line',
      active: router.pathname === '/',
    },
    {
      onClick: () => {
        searchContext.setView('search');
        changeRoute('/app');
      },
      icon: 'search-line',
      active: router.pathname === '/app' && searchContext.view === 'search',
    },
    {
      onClick: () => {
        searchContext.setView('pinned');
        changeRoute('/app');
      },
      icon: 'pushpin-2-line',
      active: router.pathname === '/app' && searchContext.view === 'pinned',
    },
    {
      onClick: () => changeRoute('/release-notes'),
      icon: 'information-line',
      active: router.pathname === '/release-notes',
    }
  ];

  return (
    <Styles.Navbar>
      {
        NAV_ITEMS.map(({ onClick, icon, active }) => (
          <Styles.NavbarItem
            key={icon}
            onClick={onClick}
            active={active}
          >
            <i className={`ri-${ icon }`}></i>
          </Styles.NavbarItem>
        ))
      }
    </Styles.Navbar>
  )
}