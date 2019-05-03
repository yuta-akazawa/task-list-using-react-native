export default class Task {
    constructor(doc) {
        const data = doc.data();
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.limitDate = data.limitDate;
        this.status = data.status;
        this.createdAt = data.createdAt;
    }
}
