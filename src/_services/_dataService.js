import { Subject } from 'rxjs';

const subject = new Subject();

const dataService = {
    setDatasource: datasource => subject.next({ datasource: datasource }),
    clearMessages: () => subject.next(),
    getDatasource: () => subject.asObservable()
};

export default dataService;
