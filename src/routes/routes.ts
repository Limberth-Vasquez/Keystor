
import indexRoute from './index.route';
import VerificationKeystorLog from './VerificationKeystorLog.route';
import Contract from './Contract.route';
import UserAdvertiser from './UserAdvertiser.route';
import AboutUs from './AboutUs.route'
import Event from './Event.route'
import ContractStatus from './ContractStatus.route';
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
        path: '/AboutUs', router: AboutUs
    },
    {
        path: '/Event', router: Event
    },
    {
        path: '/ContractStatus', router: ContractStatus
    }

];

export default routes;