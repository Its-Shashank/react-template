import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ITunesContainer from 'containers/ITunesContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: ITunesContainer,
    ...routeConstants.itunes
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
