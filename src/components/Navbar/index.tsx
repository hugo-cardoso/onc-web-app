import * as Styles from './styles';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { SearchContext } from '../../contexts/searchContext';
import { ProcedureViewerContext } from '../../contexts/procedureViewerContext';

type NavItem = {
  onClick: () => void;
  icon: string;
  active: boolean;
  badge?: number | null;
};

export const Navbar = () => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);
  const procedureViewerContext = useContext(ProcedureViewerContext);
  const [showBadge, setShowBadge] = useState<boolean>(false);

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
        changeRoute('/app/search');
      },
      icon: 'search-line',
      active: router.pathname === '/app/search' && searchContext.view === 'search',
    },
    {
      onClick: () => {
        searchContext.setView('pinned');
        searchContext.setSidebarIsOpen(true);
        changeRoute('/app/search');

        setTimeout(() => {
          procedureViewerContext.updatePageStyle();
        }, 300)
      },
      icon: 'pushpin-2-line',
      active: router.pathname === '/app/search' && searchContext.view === 'pinned',
      badge: searchContext.pinnedProcedures.length ? searchContext.pinnedProcedures.length : 0,
    },
    {
      onClick: () => changeRoute('/release-notes'),
      icon: 'information-line',
      active: router.pathname === '/release-notes',
    },
    {
      onClick: () => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfVWHqJqDIRhOIXtfr0lt5B3xaGFpd2pIr5yf2LqDeC-7TVXA/viewform?usp=sf_link'),
      icon: 'bug-line',
      active: false
    }
  ];

  useEffect(() => {
    setShowBadge(true);
  },[])

  return (
    <Styles.Navbar>
      {
        NAV_ITEMS.map(({ onClick, icon, active, badge }) => (
          <Styles.NavbarItem
            key={icon}
            onClick={onClick}
            active={active}
          >
            <i className={`ri-${ icon }`}></i>
            {
              (showBadge && badge) ? (
                <Styles.NavbarItemBadge>{ badge }</Styles.NavbarItemBadge>
              ) : null
            }
          </Styles.NavbarItem>
        ))
      }
      <Styles.BetaLabel>BETA</Styles.BetaLabel>
    </Styles.Navbar>
  )
}