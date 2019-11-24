
import indexRoute from './index.route';
import VerificationKeystorLog from './VerificationKeystorLog.route';
const routes: { path: string, router: Function }[] = [
    {
        path: '/', router: indexRoute
    },
    {
        path: '/Keystor_Log', router: VerificationKeystorLog
    }
];

export default routes;