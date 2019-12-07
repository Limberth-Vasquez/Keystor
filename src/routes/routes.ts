
import indexRoute from './index.route';
import VerificationKeystorLog from './VerificationKeystorLog.route';
import Contract from './Contract.route';
import ContractStatus from './ContractStatus.route';
import UserAdvertiser from './UserAdvertiser.route';
import UserClient from './UserClient.route';
import UserEvent from './UserEvent.route';
import UserWarehouseOwner from './UserWarehouseOwner.route';
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
import Keystor from './Keystor.route';
import Location from './Location.route';
import Notification from './Notification.route';
import FAQ from './FAQ.route';
import { KeystorActions } from '@actions/Keystor/Keystor.action';

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
        path: '/User/Event', router: UserEvent
    },
    {
        path: '/User/WarehouseOwner', router: UserWarehouseOwner
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
        path: '/Service/Type', router: TypeService
    },
    {
        path: '/Service/Advertiser', router: ServiceAdvertiser
    },
    {
        path: '/Service/WareHouse', router: ServiceWareHouse
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
    },
    {
        path: '/Keystor', router: Keystor
    },
    {
        path: '/Location', router: Location
    },
    {
        path: '/Notification', router: Notification
    },
    {
        path: '/FAQ', router: FAQ
    }

];

export default routes;