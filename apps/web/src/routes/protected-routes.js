/** @format */
'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
import LoadingPage from '@/components/loading';

const guestOnly = 'guestOnly';
const needLogin = 'needLogin';
const adminOnly = 'adminOnly';

class Route {
  constructor(path, type) {
    this.path = path;
    this.type = type;
  }
}

const routes = [];
// routes.push(new Route("/"));
routes.push(new Route('/auth/login', guestOnly));
routes.push(new Route('/auth/register', guestOnly));
routes.push(new Route('/auth/forgot-password', guestOnly));
routes.push(new Route('/auth/change-password', needLogin));
routes.push(new Route('/admin', adminOnly));
routes.push(new Route('/transactions', needLogin));
routes.push(new Route('/history', needLogin));

export default function ProtectedPage({ children }) {
  const userSelector = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRoute = routes.find((route) => pathname.includes(route.path));
    if (
      checkRoute?.type == adminOnly &&
      userSelector.role != 'storeAdmin' &&
      userSelector.role != 'superAdmin'
    )
      return redirect('/auth/login');
    else if (checkRoute?.type == needLogin && !userSelector.email)
      return redirect('/auth/login');
    else if (checkRoute?.type == guestOnly && userSelector.email)
      return redirect('/');
    else
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }, [children, userSelector.id, pathname]);

  return <div>{isLoading ? <LoadingPage /> : children}</div>;
}
