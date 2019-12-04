
import indexRoute from './index.route';
import VerificationKeystorLog from './VerificationKeystorLog.route';
import Contract from './Contract.route';
import ContractStatus from './ContractStatus.route';
import UserAdvertiser from './UserAdvertiser.route';
import UserClient from './UserClient.route';
import AboutUs from './AboutUs.route';
import Event from './Event.route';
import Warehouse from './Warehouse.route';
import TypeService from './ TypeService.route';
import ServiceAdvertiser from './ServiceAdvertiser.route';
import ServiceWareHouse from './ServiceWarehouse.route';
import TermsAndConditions from './TermsAndConditions.route';
import Rol from './Rol.route';
import Rating from './Rating.route';
import Publicity from './Publicity.route';

const routes: { path: string, router: Function }[] = [
    {
        path: '/', router: indexRoute
    },
    {
        path: '/VerificationKeystorLog', router: VerificationKeystorLog
    },
    {
        path: '/ContractStatus', router: ContractStatus
    },
    {
        path: '/Contract', router: Contract
    },
    {
        path: '/User/Advertiser', router: UserAdvertiser
    },
    {
        path: '/User/Client', router: UserClient
    },
    {
        path: '/AboutUs', router: AboutUs
    },
    {
        path: '/Event', router: Event
    },
    {
        path: '/Warehouse', router: Warehouse
    },
    {
        path: '/TypeService', router: TypeService
    },
    {
        path: '/ServiceAdvertiser', router: ServiceAdvertiser
    },
    {
        path: '/ServiceWareHouse', router: ServiceWareHouse
    },
    {
        path: '/TermsAndConditions', router: TermsAndConditions
    },
    {
        path: '/Rol', router: Rol
    },
    {
        path: '/Rating', router: Rating
    },
    {
        path: '/Publicity', router: Publicity
    }

];

export default routes;