export interface ServicePorts {
    http: number;
    https: number;
}

export const serviceMapping: Map<string, Map<string, ServicePorts>> = new Map([
    [
        'skeletonizer',
        new Map([
            ['development', { http: 5000, https: 3000 }],
            ['production', { http: 5000, https: 3000 }],
        ]),
    ],
]);
