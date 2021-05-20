import { Subject } from 'rxjs';

const subject = new Subject();
let dbSource = true;
const dataService = {
    setDatasource: datasource => {
        dbSource = datasource;
        console.log(dbSource);
        subject.next({ datasource: datasource })
    },
    clearMessages: () => subject.next(),
    getDatasource: () => subject.asObservable(),
    getDb: () => dbSource
};

export default dataService;
