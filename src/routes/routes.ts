
import indexRoute from './index.route';
import VerificationKeystorLog from './VerificationKeystorLog.route';
import Contract from './Contract.route';
import UserAdvertiser from './UserAdvertiser.route';
import Event from './Event.route'
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
    },
    {
        path: '/Event', router: Event
    }
];

export default routes;