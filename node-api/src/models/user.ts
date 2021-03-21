export class User {
    userId:string;
    firstName:string;
    lastName:string;
    emailAddress:string;
    password:string;
    constructor(
        userId:string,
        firstName:string,
        lastName:string,
        emailAddress:string,
        password:string
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    }

    public toJSON() {
        return JSON.stringify(Object.assign({}, {userId: this.userId, firstName: this.firstName, lastName: this.lastName, emailAddress: this.emailAddress}));
    }
}