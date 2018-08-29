import * as Router from 'koa-router';

import * as faker from 'faker';


import {
    words, shuffle, uniqueId, random, sum, range, take, sample, omit,
    pick, isEmpty,
} from 'lodash';

import { empty, errors, hook as hookOn } from './utils';

// import * as XLSX from 'xlsx';



const router = new Router({ prefix: '/api' });
const hook = hookOn(router);



if (`--------------------------------------------------------- /api/session`) {

    const router = new Router()

        .get('/', ctx => {

            ctx.body = {
                org: 'org',
                cloud: 'site2',
                systemAdmin: true,
                user: 'root',
                distinguishedName: 'root@system',
            };

        })

    ;

    hook('/session', router, { pipes: [] });
}

if (`------------------------------------------------------- /api/get-excel`) {

  // tslint:disable-next-line:no-var-requires
  const XLSX = require('xlsx');
  const workbook = XLSX.readFile(__dirname + '/RowViewExport.xlsx');
  const sheetNames = workbook.SheetNames;

  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

  const router = new Router()

      .get('/', ctx => {

        ctx.body = {
          cols: data[0],
          data: data.slice(1),
        };

      })

  ;

  hook('/get-excel', router, { pipes: [] });
}

if (`------------------------------------------------------ /api/components`) {

    const store: Map<string, { id: string, [key: string]: any }> = new Map();

    setImmediate(any => {
        range(6)
            .map(Maker.component)
            .forEach(item => store.set(item.id, item))
        ;
    });

    const router = new Router()

        .get('/', ctx => {
            ctx.body = Array.from(store.values());
        })

        .post('/', ctx => {

            const data = pick(
                ctx.request.body,
                [ 'name', 'type', 'endpoint', 'username', 'password' ],
            );

            const item = { ...Maker.component(), ...data };

            store.set(item.id, item);

            ctx.body = store.get(item.id);

        })

        .get('/:id', ctx => {

            const { id = '' } = ctx.params;

            ctx.assert(store.has(id), 404, errors(
                'invalid id', {
                    code: 'INVALID_ID',
                }),
            );

            ctx.body = pick(
                store.get(id),
                [ 'id', 'name', 'type', 'endpoint', 'username', 'certificate' ],
            );

        })

        .patch('/:id', ctx => {

            const { id = '' } = ctx.params;

            const data = pick(
                ctx.request.body,
                [ 'name', 'type', 'endpoint', 'username', 'password' ],
            );

            if (isEmpty(data)) {
                return empty(ctx);
            }

            // tslint:disable-next-line:no-non-null-assertion
            const item = store.get(id)!;

            store.set(item.id, {
                ...item,
                ...data,
            });

            ctx.body = store.get(id);

        })

        .delete('/:id', ctx => {

            const { id = '' } = ctx.params;

            store.delete(id);

            empty(ctx);
        })

    ;

    hook('/components', router);

}

if (`------------------------------------------------- /api/component-types`) {
    const router = new Router()
        .get('/', ctx => {
            ctx.body = [
                'VAPP_REPLICATION_MANAGER', 'REPLICATION_MANAGER', 'VCD', 'PORTAL_SERVICE',
            ];
        })
    ;

    hook('/component-types', router, { pipes: [] });
}

if (`--------------------------------------------------- api/component-test`) {


    const router = new Router()
        .post('/', ctx => {

            let data = {
                passed: sample([ true, false ]),
                errorMessage: [
                    'The server certificate is expiring in 30 days.',
                    'Component Type does not match with the given endpoint.',
                ],
            };

            if (data.passed === true) {
                data = omit(data, 'errorMessage');
            }

            ctx.body = data;
        })
    ;

    hook('/component-test', router, { pipes: [] });
}


if (`------------------------------------------------- /api/usage-threshold`) {

    let threshold = {
        warning: 85,
        critical: 95,
        displayOrgUsage: false,
    };

    const router = new Router()
        .get('/', ctx => {

            ctx.body = threshold;

        })
        .put('/', ctx => {

            threshold = ctx.request.body;

            ctx.body = threshold;

        })
    ;

    hook('/usage-threshold', router, { pipes: [] });
}




export default router;





namespace Maker {

    export function org () {
        return {
            id: faker.random.uuid(),
            name: faker.name.firstName().concat(faker.name.lastName()),
            vdcCount: random(3, 12),
            health: shuffle(words('ok warning error')).pop(),

            workloads: workloads(),
        };
    }

    export function orgStatisticsEntry (ceiling = false) {
        return function (index = 0) {

            const base = {
                org: uniqueId('Org'),
                value: random(20, 300),
            };

            if (ceiling !== true) {
                return base;
            }

            return { ...base, total: base.value * random(1, 1.4, true) };
        };
    }

    export function workloads () {
        return {
            incomingFailedoverCount: random(3, 12),
            incomingWarningCount: random(3, 12),
            incomingErrorCount: random(3, 12),
            incomingSLACount: random(30, 72),

            outgoingFailedoverCount: random(3, 12),
            outgoingWarningCount: random(3, 12),
            outgoingErrorCount: random(3, 12),
            outgoingSLACount: random(30, 72),

            get incomingCount () {
                return sum([
                    this.incomingErrorCount,
                    this.incomingWarningCount,
                    random(2, 9),
                ]);
            },

            get outgoingCount () {
                return sum([
                    this.outgoingErrorCount,
                    this.outgoingWarningCount,
                    random(1, 9),
                ]);
            },
        };
    }

    export function vdc (id = faker.random.uuid()) {

        const makeUsage = () => ({
            allocation: random(200, 1000),
            limit: 1000,
            used: random(200, 900),
            state: shuffle([ 'NORMAL', 'WARNING', 'CRITICAL_WARNING' ]).pop(),
        });

        return {
            id,
            org: uniqueId('org-'),
            name: uniqueId('drVdc-'),

            cpuMHz: makeUsage(),
            memoryMB: makeUsage(),
            storageMB: makeUsage(),
        };
    }

    export function location () {
        return {
            id: faker.random.uuid(),
            name: faker.address.streetName(),

            latitude: faker.address.latitude(),
            longitude: faker.address.longitude(),

            city: faker.address.city(),
            country: faker.address.country(),
            description: faker.random.words(),

            numberOfVCD: random(1, 5),
        };
    }

    export function neighbor () {
        return {
            id: faker.random.uuid(),
            name: uniqueId('vCD'),
            sppUrl: 'https://spp-url.com/',
            vcdUrl: 'https://vcd-url.com/',
            location: Maker.location(),
        };
    }

    export function providerVDCs () {

        const makeUsage = () => ({
            allocation: random(700, 100000),
            limit: 10000,
            used: random(200, 9000),
            state: sample([ 'NORMAL', 'WARNING', 'CRITICAL_WARNING' ]),
        });

        return {
            id: faker.random.uuid(),
            name: uniqueId('vCD'),
            cpuMHz: makeUsage(),
            memoryMB: makeUsage(),
            storageMB: makeUsage(),
        };
    }

    export function systemStatus (type: string) {

        const health = sample([
            ...range(8).map(n => 'NORMAL'),
            'WARNING', 'CRITICAL_WARNING', 'ERROR', 'UNKNOWN',
        ]);

        const messages = Array.from(
            {
                length: faker.random.number(5),
            },
            () => faker.lorem.sentence(),
        );

        const data = {
            health,

            id: faker.random.uuid(),
            name: faker.company.companyName(),
            type: type,
            messages: messages,
            updateTime: faker.date.past().toISOString(),
        };

        return data;
    }


    export function component () {
        return {
            id: faker.random.uuid(),
            name: faker.address.streetName(),
            type: [ 'C4', 'H4', 'Replicator', 'Portal_Service' ][random(3)],
            endpoint: faker.helpers.userCard().website,
            username: faker.company.companyName(),
            // password: faker.phone.phoneNumber(),
            certificate: {
                // tslint:disable-next-line:max-line-length
                thumbprint: '17:8F:79:D7:FA:DF:63:DD:75:B2:BC:37:5D:D9:B9:2C:0B:66:82:9E:41:99:7A:93:A1:63:4D:B8:47:73:CF:0A',
            },
        };
    }

}

