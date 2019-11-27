
import indexRoute from './index.route';
import VerificationKeystorLog from './VerificationKeystorLog.route';
import Contract from './Contract.route';
import UserAdvertiser from './UserAdvertiser.route';
const routes: { path: string, router: Function }[] = [
    {
        path: '/', router: indexRoute
    },
    {
        path: '/VerificationKeystorLog', router: VerificationKeystorLog
    },
    {
        path: '/Contract', router: Contract
    },
    {
        path: '/UserAdvertiser', router: UserAdvertiser
    }
];

export default routes;