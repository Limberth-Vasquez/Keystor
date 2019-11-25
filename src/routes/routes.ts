
import indexRoute from './index.route';
import VerificationKeystorLog from './VerificationKeystorLog.route';
const routes: { path: string, router: Function }[] = [
    {
        path: '/', router: indexRoute
    },
    {
        path: '/VerificationKeystorLog', router: VerificationKeystorLog
    }
];

export default routes;