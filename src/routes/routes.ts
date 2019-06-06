
import indexRoute from './index.route'
const routes: { path: string, router: Function }[] = [
    {
        path: '/', router: indexRoute
    }
];

export default routes;