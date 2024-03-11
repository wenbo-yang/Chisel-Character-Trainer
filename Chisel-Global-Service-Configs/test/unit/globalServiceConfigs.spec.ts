import { GlobalServiceConfigs } from '../../src/globalSeviceConfigs';

describe('globalServiceConfigs', () => {
    describe('getServicePorts', () => {
        it('for skeletonizer getServicePorts for development should return 5000 and 3000', () => {
            const servicePorts = new GlobalServiceConfigs().getServicePorts('skeletonizer', 'development');
            expect(servicePorts).toEqual({ http: 5000, https: 3000 });
        });
    });
});
